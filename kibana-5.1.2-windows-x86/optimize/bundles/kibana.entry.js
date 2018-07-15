
/**
 * Test entry file
 *
 * This is programatically created and updated, do not modify
 *
 * context: {"env":"production","urlBasePath":"","sourceMaps":false,"kbnVersion":"5.1.2","buildNum":14588}
 * includes code from:
 *  - console@kibana
 *  - elasticsearch@kibana
 *  - kbn_doc_views@kibana
 *  - kbn_vislib_vis_types@kibana
 *  - kibana@kibana
 *  - markdown_vis@kibana
 *  - metric_vis@kibana
 *  - spy_modes@kibana
 *  - status_page@kibana
 *  - table_vis@kibana
 *  - tagcloud@kibana
 *  - timelion@kibana
 *
 */

require('ui/chrome');
require('plugins/kibana/kibana');
require('plugins/kbn_vislib_vis_types/kbn_vislib_vis_types');
require('plugins/markdown_vis/markdown_vis');
require('plugins/metric_vis/metric_vis');
require('plugins/table_vis/table_vis');
require('plugins/tagcloud/tag_cloud_vis');
require('plugins/timelion/vis');
require('plugins/spy_modes/table_spy_mode');
require('plugins/spy_modes/req_resp_stats_spy_mode');
require('plugins/console/console');
require('plugins/kbn_doc_views/kbn_doc_views');
require('plugins/timelion/lib/panel_registry');
require('plugins/timelion/panels/timechart/timechart');
require('ui/chrome').bootstrap(/* xoxo */);

