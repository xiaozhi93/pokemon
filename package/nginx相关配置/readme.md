# 域名配置
server_name xdstest.xingke100.com;
# 反向代理
location /api {
    proxy_pass http://apitest.xingke100.com;
}
# history路由模式
location /mobile {
    root /xkdata/test/admin;
    try_files $uri $uri/ /mobile/index.html;
}
# 路由请求头拦截
location /admin {
    root /xkdata/test/admin/dist;
    try_files $uri $uri/ /admin.html;
}
location / {		
    root /xkdata/test/admin/dist;
		if ( $http_user_agent ~ "(MIDP)|(WAP)|(UP.Browser)|(Smartphone)|(Obigo)|(Mobile)|(AU.Browser)|(wxd.Mms)|(WxdB.Browser)|(CLDC)|(UP.Link)|(KM.Browser)|(UCWEB)|(SEMC-Browser)|(Mini)|(Symbian)|(Palm)|(Nokia)|(Panasonic)|(MOT-)|(SonyEricsson)|(NEC-)|(Alcatel)|(Ericsson)|(BENQ)|(BenQ)|(Amoisonic)|(Amoi-)|(Capitel)|(PHILIPS)|(SAMSUNG)|(Lenovo)|(Mitsu)|(Motorola)|(SHARP)|(WAPPER)|(LG-)|(LG/)|(EG900)|(CECT)|(Compal)|(kejian)|(Bird)|(BIRD)|(G900/V1.0)|(Arima)|(CTL)|(TDG)|(Daxian)|(DAXIAN)|(DBTEL)|(Eastcom)|(EASTCOM)|(PANTECH)|(Dopod)|(Haier)|(HAIER)|(KONKA)|(KEJIAN)|(LENOVO)|(Soutec)|(SOUTEC)|(SAGEM)|(SEC-)|(SED-)|(EMOL-)|(INNO55)|(ZTE)|(iPhone)|(Android)|(Windows CE)|(Wget)|(Java)|(curl)|(Opera)" ) {
      root /xkdata/test/wap;
			
    }
		
}
# 负载均衡
upstream backend  {
  server backend1.example.com weight=5;
  server backend2.example.com:8080;
  server unix:/tmp/backend3;
}
server {
  location / {
    proxy_pass  http://backend;
  }
}
# 配置https(云计算厂商不需要nginx配置，直接勾选服务就可以，本地服务需要443端口，证书)
server {
    listen 443;
    server_name api.xingke100.com;
    ssl on;
    ssl_certificate 1_api.xingke100.com_bundle.crt;
    ssl_certificate_key 2_api.xingke100.com.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    charset utf-8;
    location / {
        proxy_pass http://localhost:8092;
    }
}
# 启动gzip压缩
gzip on;
gzip_http_version 1.1;
gzip_comp_level 5;
gzip_min_length 1000;
gzip_types text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml;
# http数据传输数据大小（适用于视频上传修改）
client_max_body_size 50m;