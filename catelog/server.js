const express = require('express');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3000;
const baseUrl = '/catelog';
const mustacheExpress = require('mustache-express');
const fs = require('fs');
const path = require('path');
const parser = require('fast-xml-parser');
const FSBuilder = require('./FSBuilder');
const mockApiRouter = require('./routes/mock');
const gitRouter = require('./routes/git');

const componentsDir = path.join(__dirname, '../components');
const fsBuilder = new FSBuilder(componentsDir);

const baseUrlPattern = new RegExp(`^\\${baseUrl}`);
const stripBaseUrlMiddleware = (req, res, next) => {
  req.url = req.url.replace(baseUrlPattern, '');
  next();
};
const parserOptions = {
  attributeNamePrefix: '',
  ignoreAttributes: false,
  allowBooleanAttributes: true,
  parseAttributeValue: true,
};
app.use(stripBaseUrlMiddleware);

// Register '.mustache' extension with The Mustache Express
app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(compression());
app.use('/components', express.static(path.join(__dirname, '../dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ETInfo Airline Parsing
let ETAirlines = {};
const ASAirlines = {};
// parse ETInfo XML to JSON for serving
fs.readFile('./catelog/xml/ETAirlines.xml', 'utf8', function(err, data) {
  if (err !== null) {
    console.log(JSON.stringify(err));
  } else {
    ETAirlines = parser.parse(data, parserOptions);
    // decouple ETInfo structure from the lamborghini
    ETAirlines['ETAirlines']['Airlines']['Airline'].forEach((airline) => {
      ASAirlines[airline.Code] = {
        ID: airline.ID,
        Code: airline.Code,
        OperatedBy: airline.OperatedBy,
        DisplayName: airline.DisplayName,
        OperatedByName: airline.OperatedByName,
        ImageName: airline.ImageName,
        Url: airline.Url,
      };
    });
  }
});
app.get('/api/airlines/:iata', (req, res) => {
  if (!/^[A-Z0-9]{2}$/.test(req.params.iata)) {
    // noty :)
    return res.status(400).end();
  }
  res.status(200).send(JSON.stringify(ASAirlines[req.params.iata.toUpperCase()]));
});

// ETInfo Airline Parsing
let ETAirports = {};
const ASAirports = {};
// parse ETInfo XML to JSON for serving
fs.readFile('./catelog/xml/ETAirports.xml', 'utf8', function(err, data) {
  if (err !== null) {
    console.log(JSON.stringify(err));
  } else {
    ETAirports = parser.parse(data, parserOptions);
    // decouple ETInfo structure from the lamborghini
    ETAirports['ETAirports']['Airport'].forEach((airport) => {
      ASAirports[airport.Code] = {
        Type: airport.Type,
        Code: airport.Code,
        Name: airport.Name,
        Region: airport.Region,
        Country: airport.Country,
        AS: airport.AS,
        QX: airport.QX,
        Effective: airport.Effective,
        LowFrequency: airport.LowFrequency,
        Map: airport.Map,
        eBP: airport.eBP,
        ITMName: airport.ITMName,
      };
    });
  }
});
app.get('/api/airport/:iata', (req, res) => {
  if (!/^[A-Z]{3}$/.test(req.params.iata)) {
    // noty :)
    return res.status(200).send(JSON.stringify(ASAirports));
  }
  res.status(200).send(JSON.stringify(ASAirports[req.params.iata.toUpperCase()]));
});

app.get('/', (req, res) => {
  res.render('index.html', {
    baseUrl,
    mainContent: fs.readFileSync(path.join(__dirname, 'views/home.html'), 'utf8'),
    isHome: true,
    menu: fsBuilder.buildHTMLMenu(null),
  });
});

app.get('/demo/:component', (req, res) => {
  const componentName = req.params.component;
  const componentObject = fsBuilder.components.find((c) => c.name === componentName);
  const componentPath = componentObject.dir.split('components/')[1];
  const demoPath = path.join(componentObject.dir, `/demo.html`);
  const mainContent = fs.readFileSync(demoPath, 'utf8');

  res.render('index',
      {
        baseUrl,
        fileSystem: fsBuilder.fileSystem,
        mainContent,
        componentObject,
        componentPath: componentPath,
        menu: fsBuilder.buildHTMLMenu(componentPath),
        fileServerPath: encodeURIComponent(componentPath),
        isDemo: true,
      });
});

app.use(gitRouter);

app.use(mockApiRouter);

app.listen(port, () => console.log(`Catelog app running at http://localhost:${port}`));
