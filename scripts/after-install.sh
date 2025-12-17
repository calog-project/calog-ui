#!/bin/bash
set -e

# 로그 리다이렉션 (배포 로그 저장)
exec > >(tee /home/ubuntu/deploy.log) 2>&1

echo "Deployment started (Build Artifact Mode)..."

# 파일 소유권 변경 (Root -> Ubuntu)
chown -R ubuntu:ubuntu /home/ubuntu/calog-ui

# Ubuntu 사용자로 실행
runuser -l ubuntu -c '
    # NVM 로드
    export NVM_DIR="/home/ubuntu/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    cd /home/ubuntu/calog-ui
    echo "Node version: $(node -v)"

    # PM2 실행 (이미 있으면 reload, 없으면 start)
    if pm2 list | grep -q "calog-ui"; then
        echo "Reloading..."
        pm2 reload calog-ui
    else
        echo "Starting..."
        pm2 start server.js --name "calog-ui"
    fi

    pm2 save
'

echo "Deployment finished."