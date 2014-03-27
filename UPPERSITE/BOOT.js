global.BOOT=BOOT=function(params){"use strict";var fs=require("fs"),path=require("path"),MULTI_LANG_SUPPORT=params.MULTI_LANG_SUPPORT,rootPath=__dirname+"/..",browserScript="\nglobal = window;\n",logoText,stringifyJSONWithFunction,loadAll,startServer;stringifyJSONWithFunction=function(data){return JSON.stringify(data,function(t,e){return"function"==typeof e?"__THIS_IS_FUNCTION_START__"+e.toString()+"__THIS_IS_FUNCTION_END__":e},"	").replace(/("__THIS_IS_FUNCTION_START__(.*)__THIS_IS_FUNCTION_END__")/g,function(match,content){return eval("("+eval('"'+content.substring('"__THIS_IS_FUNCTION_START__'.length,content.length-'__THIS_IS_FUNCTION_END__"'.length)+'"')+")").toString()})},loadAll=function(){var t,e,n,r,o,i,a,s,c,E,l,S,_;t=function(t){var e=t.path,n=t.name;return fs.statSync(rootPath+"/"+e).isDirectory()===!0&&"."!==n[0]&&"node_modules"!==n&&"not_load"!==n&&"deprecated"!==n&&"_"!==n[0]},e=function(){fs.readdirSync(rootPath).forEach(function(e){t({path:e,name:e})===!0&&(global[e]=BOX(e),browserScript+="global."+e+" = BOX('"+e+"');\n")})},n=function(t){var e,n,r,o=rootPath+"/"+t,i=path.extname(t);if(o.substring(0,(rootPath+"/UPPERSITE").length)!==rootPath+"/UPPERSITE")for(e in MULTI_LANG_SUPPORT)if(MULTI_LANG_SUPPORT.hasOwnProperty(e,o)===!0&&i==="."+e)return n="//"+fs.statSync(o).mtime.getTime(),(fs.existsSync(o+".__UPPERSITE_COMPILED")===!1||fs.readFileSync(o+".__UPPERSITE_COMPILED").toString().substring(0,n.length)!==n)&&(r=n+"\n"+MULTI_LANG_SUPPORT[e](fs.readFileSync(o).toString(),o),fs.writeFileSync(o+".__UPPERSITE_COMPILED",r)),void require(o+".__UPPERSITE_COMPILED");".js"===i?require(o):".__UPPERSITE_COMPILED"===i&&fs.existsSync(o.substring(0,o.length-".__UPPERSITE_COMPILED".length))===!1&&fs.unlinkSync(o)},r=function(t){var e,n,r,o=rootPath+"/"+t,i=path.extname(t);if(o.substring(0,(rootPath+"/UPPERSITE").length)!==rootPath+"/UPPERSITE")for(e in MULTI_LANG_SUPPORT)if(MULTI_LANG_SUPPORT.hasOwnProperty(e,o)===!0&&i==="."+e)return n="//"+fs.statSync(o).mtime.getTime(),fs.existsSync(o+".__UPPERSITE_COMPILED")===!1||fs.readFileSync(o+".__UPPERSITE_COMPILED").toString().substring(0,n.length)!==n?(r=n+"\n"+MULTI_LANG_SUPPORT[e](fs.readFileSync(o).toString(),o),fs.writeFileSync(o+".__UPPERSITE_COMPILED",r)):r=fs.readFileSync(o+".__UPPERSITE_COMPILED").toString(),void(browserScript+=r+"\n");".js"===i?(r=fs.readFileSync(o).toString(),browserScript+=r+"\n"):".__UPPERSITE_COMPILED"===i&&fs.existsSync(o.substring(0,o.length-".__UPPERSITE_COMPILED".length))===!1&&fs.unlinkSync(o)},o=function(t){n(t),r(t)},i=function(e,n){var r=function(e){var o,i;if(fs.existsSync(e)===!0)for(o=[],fs.readdirSync(e).forEach(function(r){var i=e+"/"+r;t({path:i,name:r})===!0?o.push(i):fs.statSync(rootPath+"/"+i).isDirectory()!==!0&&n(i)}),i=0;i<o.length;i+=1)r(o[i])};FOR_BOX(function(t){r(t.boxName+"/"+e)})},a=function(t){i(t,n)},s=function(t){i(t,r)},c=function(t){i(t,o)},E=function(){void 0!==params&&(void 0!==params.CONFIG&&(EXTEND_DATA({origin:global.CONFIG,extend:params.CONFIG}),browserScript+="EXTEND_DATA({ origin : global.CONFIG, extend : "+stringifyJSONWithFunction(params.CONFIG)+" });\n"),void 0!==params.SERVER_CONFIG&&(EXTEND_DATA({origin:global.SERVER_CONFIG,extend:params.SERVER_CONFIG}),SERVER_CONFIG.rootPath=rootPath),void 0!==params.BROWSER_CONFIG&&(browserScript+="EXTEND_DATA({ origin : global.BROWSER_CONFIG, extend : "+stringifyJSONWithFunction(params.BROWSER_CONFIG)+" });\n")),CONFIG.version=String((new Date).getTime()),browserScript+="CONFIG.version = "+CONFIG.version+";\n"},l=function(){var t=UPPERSITE.MODULE("mongolian");UPPERSITE.db=(new t).db(SERVER_CONFIG.dbName),SERVER_CONFIG.isNotRequiringDBAuth!==!0&&UPPERSITE.db.auth(SERVER_CONFIG.dbUsername,SERVER_CONFIG.dbPassword)},S=function(){var t=UPPERSITE.MODULE("uglify-js");browserScript=t.minify(browserScript,{fromString:!0,mangle:!0}).code},_=function(){logoText=fs.readFileSync(rootPath+"/UPPERSITE/LOGO"),browserScript="/* Welcome to JavaScript World! :)\n"+logoText+"\n  Contact: "+CONFIG.contactAddress+"\n\n*/"+browserScript},o("UPPERSITE/UPPERCASE-BASE.js"),e(),c("COMMON"),a("SERVER"),s("BROWSER"),r("UPPERSITE/BROWSER_FIX.js"),E(),SERVER_CONFIG.isNotUsingDB!==!0&&l(),r("UPPERSITE/BROWSER_INIT.js"),CONFIG.isDevMode!==!0&&S(),_()},startServer=function(){var t,e,n,r,o=require("http"),i=require("https"),a=UPPERSITE.MODULE("socket.io"),s=UPPERSITE.MODULE("formidable").IncomingForm,c=UPPERSITE.MODULE("imagemagick");r=function(t,e){var n,r,o,i,a,E,l,S,_,f,d,u,P,g,I,R,O=t.url,p={},T=t.headers["X-Forwarded-For"];void 0===T&&(T=t.connection.remoteAddress),i=function(t){var e=path.extname(t);return".png"===e?"image/png":".jpg"===e||".jpeg"===e?"image/jpeg":".gif"===e?"image/gif":".js"===e?"text/javascript":".css"===e?"text/css":".txt"===e?"text/plain":".html"===e?"text/html":".swf"===e?"application/x-shockwave-flash":"application/octet-stream"},a=function(t){return"text/javascript"===t?"utf-8":"text/css"===t?"utf-8":"text/plain"===t?"binary":"text/html"===t?"utf-8":"image/png"===t?"binary":"image/jpeg"===t?"binary":"image/gif"===t?"binary":"application/x-shockwave-flash"===t?"binary":"binary"},E=function(){var t=O.indexOf("?");-1!==t&&(r=decodeURI(O.substring(t+1)),O=O.substring(0,t)),n=O.substring(1)},l=function(){var t=n.indexOf("/");-1===t?o=CONFIG.defaultBoxName:(o=n.substring(0,t),void 0!==global[o]&&global[o].type===BOX?n=n.substring(t+1):o=CONFIG.defaultBoxName)},S=function(){return"cached"===t.headers["if-none-match"]},_=function(t){e.writeHead(302,{Location:t}),e.end()},f=function(){e.statusCode=304,e.end()},d=function(t){var n=t.content,r=t.contentType,o=t.encoding,i=t.isUsingCache;e.setHeader("Content-Type",r),i===!0&&e.setHeader("ETag","cached"),e.statusCode=200,e.end(n,o)},u=function(){d({content:browserScript,contentType:"text/javascript",encoding:"utf-8"})},P=function(){var n=new s,r=[],i={};n.uploadDir="__UPLOAD/"+o+"/__TEMP/",fs.existsSync(rootPath+"/"+n.uploadDir)===!1&&console.log("Not exists folder: "+rootPath+"/"+n.uploadDir),void 0!==global[o]&&fs.existsSync(rootPath+"/"+n.uploadDir)===!0?(n.on("field",function(t,e){i[t]=e}).on("file",function(t,e){r.push({tempPath:e.path,size:e.size,name:e.name,type:e.type,lastModifiedDate:e.lastModifiedDate})}).on("end",function(){var t=global[o].DB("__UPLOAD_FILE"),n=0;EACH(r,function(a){var s=a.tempPath;return a.size>1024*CONFIG.maxUploadFileMB*1024?(e.writeHead(200,{"Content-Type":"text/html"}),e.end("<script>errorCode='SIZE'</script>","utf-8"),!1):(EACH(i,function(t,e){""!==t.trim()&&(a[e]=t)}),REMOVE_AT({data:a,key:"tempPath"}),void c.readMetadata(s,function(i,E){var l=function(){t.createData(a,function(t,i){var a=UPPERSITE.MODULE("mv"),c=rootPath+"/__UPLOAD/"+o+"/"+i.id;void 0===t&&a(s,c,function(){n+=1,n===r.length&&(EACH(r,function(t,e){r[e]=PACK_DATA(t)}),e.writeHead(200,{"Content-Type":"text/html"}),e.end("<script>fileDataSet="+JSON.stringify(r)+"</script>","utf-8")),console.log("File '"+c+"' ("+i.name+", "+i.size+" byte) uploaded.")})})};void 0!==E.exif?(a.exif=E.exif,c.convert([s,"-auto-orient",s],function(){l()})):l()}))})}).on("error",function(){e.writeHead(200,{"Content-Type":"text/html"}),e.end("<script>errorCode='ERROR'</script>","utf-8")}),n.parse(t)):(e.writeHead(200,{"Content-Type":"text/html"}),e.end("<script>errorCode='ERROR'</script>","utf-8"))},g=function(){var t,e,r,s=rootPath+"/"+o+"/WEB/"+n;if(n.length>=7&&"CACHED/"===n.substring(0,7)&&CONFIG.isDevMode!==!0){if(S()===!0)return void f();r=!0}n.length>=9&&"__UPLOAD/"===n.substring(0,9)?(n=n.substring(9),I()):void 0!==p[s]?d(p[s]):(t=i(n),e=a(t),fs.exists(s,function(n){n===!0?fs.readFile(s,e,function(n,o){null!==n?R():d(p[s]={content:o,contentType:t,encoding:e,isUsingCache:r})}):R()}))},I=function(){var t;S()===!0?f():(t=rootPath+"/__UPLOAD/"+o+"/"+n,fs.exists(t,function(e){e===!0?fs.readFile(t,"binary",function(e,n){null!==e?R():fs.stat(t,function(t,e){null!==t?R():d({key:e.size+"-"+Date.parse(e.mtime),content:n,contentType:"application/octet-stream",encoding:"binary"})})}):R()}))},R=function(){_(SERVER_CONFIG.errorPageUrl)},E(),"POST"===t.method.toUpperCase()?(l(),"__UPLOAD"===n?P():(r="",t.on("data",function(t){r+=t}),t.on("end",function(){void 0!==global[o]&&void 0!==global[o].REQUEST&&void 0!==global[o].REQUEST.checkURI&&global[o].REQUEST.checkURI({uri:n,paramStr:r,ip:T,headers:t.headers},{response:d,serveErrorPage:R})===!0||g(o)}))):"__SCRIPT"===n?u():(l(),""===n&&(n="index.html"),void 0!==global[o]&&void 0!==global[o].REQUEST&&void 0!==global[o].REQUEST.checkURI&&global[o].REQUEST.checkURI({uri:n,paramStr:r,ip:T,headers:t.headers},{response:d,serveErrorPage:R})===!0||g(o))},t=o.createServer(r).listen(CONFIG.port),void 0!==SERVER_CONFIG.securedPort&&(e=i.createServer({key:fs.readFileSync(rootPath+"/"+SERVER_CONFIG.securedKeyFileName),cert:fs.readFileSync(rootPath+"/"+SERVER_CONFIG.securedCrtFileName)},r).listen(SERVER_CONFIG.securedPort)),n=a.listen(t),CONFIG.isDevMode===!0?n.set("log level",2):n.set("log level",1),n.set("transports",["websocket","flashsocket","xhr-polling","jsonp-polling"]),CONNS.type.socketPack=n.sockets,OBJECT.init(),FOR_BOX(function(t){void 0!==t.MAIN&&t.MAIN()}),console.log("[UPPERSITE SERVER STARTED] http://localhost:"+CONFIG.port+(void 0!==SERVER_CONFIG.securedPort?" and secured server started. https://localhost:"+SERVER_CONFIG.securedPort:""))},loadAll(),startServer()};