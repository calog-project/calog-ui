#!/bin/bash
# 기존 애플리케이션 정리
pm2 delete calog-ui || true
rm -rf /home/ubuntu/calog-ui