#!/bin/bash
set -e
#!/bin/bash
cd /home/ubuntu/calog-ui

# Node.js 의존성 설치 (개발 의존성 포함)
npm ci

# EC2에서 빌드 (Sharp.js 호환성)
npm run build

# PM2로 Next.js 앱 시작
pm2 start npm --name "calog-ui" -- start

# PM2 프로세스 저장
pm2 save
