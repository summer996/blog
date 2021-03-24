![avatar]('./../image/async-defer.png')

没有defer async会立即下载，并且阻塞dom解析

defer: 不会阻塞dom解析，js文件和dom解析并行加载，但会在dom解析完成之后，domcontentLoad加载前解析

async: js下载不会阻塞dom下载，js下载完成，解析会阻塞dom加载，解析时间不稳定


