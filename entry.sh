mkdir data/ssl -p

# Change this to your domain
mkdir -p ./data/ssl
cp /etc/letsencrypt/live/rb-taktik.marceldobehere.com/fullchain.pem ./data/ssl/cert.pem
cp /etc/letsencrypt/live/rb-taktik.marceldobehere.com/privkey.pem ./data/ssl/key.pem


exec node index.js
# -https