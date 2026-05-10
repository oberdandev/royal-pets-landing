#!/bin/bash
cd /home/orangepi/.openclaw/workspace/royal-pets-landing
npx tsx server/index.ts > server.log 2>&1 &
echo $! > server.pid
sleep 3
curl -s http://localhost:3001/api/health
