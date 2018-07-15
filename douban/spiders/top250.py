# -*- coding: utf-8 -*-
import scrapy


from douban.items import DoubanItem
from scrapy_redis.spiders import RedisCrawlSpider

class Top250Spider(RedisCrawlSpider):
    name = 'top250'
    #改为redis分布式
    redis_key = 'myspider:start_urls'
    #允许域名如果添加/top250，会出现'Filtered offsite request to'错误
    allowed_domains = ['movie.douban.com']
    #start_urls = ['https://movie.douban.com/top250']

    def parse(self,response):
        movie_list = response.xpath('//*[@id="content"]/div/div[1]/ol/li')
        for i in movie_list:
            douban_item = DoubanItem()
            #xpath解析具体数据
            # 从/li后开始，注意路径，注意'.'，注意最后的text()
            douban_item['rank'] = i.xpath('./div/div[1]/em/text()').extract_first()
            douban_item['name'] = i.xpath('./div/div[2]/div[1]/a/span[1]/text()').extract_first()
            douban_item['points'] = i.xpath('./div/div[2]/div[2]/div/span[2]/text()').extract_first()
            douban_item['intro'] = i.xpath('./div/div[2]/div[2]/p[2]/span/text()').extract_first()

            #将数据yield到piplines中
            yield douban_item
        #解析下一页，注意引号变换
        next_link = response.xpath("//span[@class='next']/link/@href").extract()
        #判断是否结束
        if next_link:
            next_link = next_link[0]
            #yield到调度器，加回调函数callback
            yield scrapy.Request("https://movie.douban.com/top250" + next_link,callback=self.parse)