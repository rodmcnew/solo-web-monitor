# Solo Web Monitor

[Try the demo](https://solo-web-monitor.herokuapp.com/demo/reset-data). Give the demo 60 seconds to first load because it is on a free Heruko instance.

This is a simple stand alone web uptime monitor. It will watch any URLs you give it and will let you know if they go down. You can run this app locally or on a server. The only thing that is required is NodeJS. No external database is required.

## Solo Web Monitor is built on top of:
- TypeScript for client and server
- React functional components
- Redux Toolkit
- Loopback 4 Node.js server framework

## How to install and run:
1) Install the app
```bash
# Clone the source code
git clone git@github.com:rodmcnew/solo-web-monitor.git

# Cd into the project
cd solo-web-monitor

# Run the build
npm run build:stand-alone-install
```

2) Run the app:
```bash
npm start
```
3) Navigate to the app in your web broweser at http://localhost:3000
