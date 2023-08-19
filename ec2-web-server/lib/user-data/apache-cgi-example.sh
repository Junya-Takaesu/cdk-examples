#!/bin/bash

# This script is used for User Data when launching EC2 instance
# and install httpd and php on Amazon Linux 2.
# After install these two, add cgi scripts written in bash and php.

# login as root
sudo su --login root

# update yum
yum update

# install httpd
yum -y install httpd

# start httpd
systemctl start httpd.service

# enable httpd
systemctl enable httpd.service

# install php
amazon-linux-extras enable php8.2
amazon-linux-extras install php8.2

# write bash script to /var/www/cgi-bin/hoge.sh
cat <<EOF >/var/www/cgi-bin/hoge.sh
#!/bin/bash
echo -e "Content-type: text/html\n\n"
echo "
<html>
    <head>
        <title>hoge.sh</title>
    </head>
    <body>
        <h1>hoge.sh executes bash command</h1>
        <ul>
            <li>$(uname -a)</li>
            <li>$(whoami)</li>
        </ul>
        <hr>
        <p>
            $(top -b -n 1 | head -n 20 | sed 's/$/<br>/')
        </p>
    </body>
</html>
"
EOF

# write php script to /var/www/cgi-bin/hoge.php
cat <<EOF >/var/www/cgi-bin/hoge.php
<html>
    <head>
        <title>hoge.php</title>
    </head>
    <body>
        <h1>hoge.php executes php command</h1>
    </body>
    <?php phpinfo(); ?>
</html>
EOF

# write custom apache configuration to allow cgi scripts
cat <<EOF >/etc/httpd/conf.d/cgi.conf
LoadModule cgid_module modules/mod_cgid.so
<IfModule alias_module>
    ScriptAlias /my-scripts/ "/var/www/cgi-bin/"
</IfModule>
<Directory "/var/www/cgi-bin">
    AllowOverride None
    Options +ExecCGI
    AddHandler cgi-script .cgi .pl .py .sh .php
    Require all granted
</Directory>
EOF

# change permission of cgi scripts
chmod 755 /var/www/cgi-bin/hoge.sh
chmod 755 /var/www/cgi-bin/hoge.php

# restart httpd
systemctl restart httpd.service
