<h1>Eligibility Checking Engine</h1>

The Eligibility Checking Engine (ECE) is a platform which enables services to be supproted by the means to check the eligibility of families and children during their education.

This includes but is not limited to:
- Parents can check eligibility, apply and appeal against decisions around Free School Meals (FSM)
- Schools and LA's can check eligibility, apply and appeal against decisions around Free School Meals (FSM)
- Schools and LA's can finalise the application for FSM


---------------------------------------------------------------------------------

<h3>Design history</h3>
URL: https://

A history of the design of this service

---------------------------------------------------------------------------------
<h2>Documentation</h2>
<ol>
  <li>
    Prototypes
  </li>
    <li>
    Versioning in prototype 
  </li>
  <li>
    Git status naming conventions 
  </li>
  <li>
    Glossary
  </li>
</ol>

---------------------------------------------------------------------------------

<h2>Eligibility Checking Engine</h2>
This prototype is based on the:

<a href="https://design-system.service.gov.uk/components/">GOV.UK Design System</a>
<a href="https://design-system.service.gov.uk/components/">GOV.UK Prototype Kit</a>

<h2>Installation</h2>

<h3>Requirements</h3>
<code>node.js - version 20.x.x or later</code>
<code>dfe-frontend v2.01 last updated 5 May 2024</code>

<h3>Install dependencies</h3>
<code>npm install</code>

<h3>Start the app</h3>
npm run dev

Go to http://localhost:3000 in your browser.

<h3>Deployed prototype</h3>
URL: https://check-your-eligibility-prototype.azurewebsites.net
password: request from Design team

We are currently in a Private beta of the replacement Eligibility checking service - FSM. 

This version deploys automatically from merges to main and is the 'latest' version for UR and UX iterations.

Prototypes are for both Free school meals and Childcare as separate prototypes for this stage of the replacement service.

The rationale behind this is:

Free school meals is to be translated into Welsh
Childcare options are not to be translated into Welsh

Childcare services are to be reviewed and determined further by additional teams with discovery taking place in 2025.
The free school meals service will be rolled out across the UK and continuously iterated on.

NB Development ready designs can be viewed in #Ready for Development and Work in progress designs can be viewed in #Design and research.

---------------------------------------------------------------------------------

<h3>Prototype version </h3>

Versions are numbered incrementally v6, v7 and only moved to Ready for development when it has been signed off by Ian Howard - Product Owner where the version number will be updated. 
Design iterations are identified by i1, i2, i3 for each user group as we are testing. This means that we can focus on individual user groups in each round and identify key areas of prioritisation throughout . 

---------------------------------------------------------------------------------

<h3>Git status naming conventions</h3>

[Eligibility service][User][Feature/Tweak/Bug][Designername]
<br>
example:
FSM-Schools-tweak-contentupdate-EW
<br>Childcare-Family-feature-uploadevidence-JH
[Description of changes]

NB Github no# recorded in Prototype index for dev visibility

---------------------------------------------------------------------------------

<h3>Glossary of terms used</h3>

<p><b>FSM</b> Free School Meals</p>
<p><b>NASS</b>National Asylum Support Service</p>
<p><b>ASR</b>Asylum Seeker Reference</p>

