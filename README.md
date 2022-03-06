# GIFT
GIFT is an application that provides users ideas for gifts. Users can search for gifts by category. If user is signed in, it allows the user to add recipients and take a personality test to get a personality trait. The user then can see what gifts are suggested for that personality test result. 

#### This page is licensed under (click badge for license page): 
[![license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## User Story
As hangouts are limited due to Covid, I would like to send some gifts to friends that I haven’t met for years. When I open GIFT, I can search for some gift ideas. When I signed up, I can login to my dashboard and create my recipient list. When I select the recipient, I will be redirected to the personality test page. When I finished the test and click on the result, I will get to the search gift page.

## Built With
* React
* HTML
* CSS/Bulma
* JavaScript
* Node.js
* Express
* GraphQL
* Mongoose
* MongoDB
* Heroku
* AWS-S3
* JWT

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Challenges](#challenges) 
* [Collaborators](#collaborators)
* [Website](#website)

## Installation
To install this application, clone the repository.<br/>
Run `npm install`.<br/>
Create an .env.staging file.<br/>
In the file, add your database information and AWS access code. <br/>
Run `npm run develop`


## Usage
Screenshot: <br/>
![screenshot](./client/src/assets/images/)

## Challenges
This project took us some time at mapping our models for how everything could be linked together. At the begining, we were not able to figure how we summerize the personality traits result from the answers the users provided. We also went back and forth at how the gift should be traced by the sender.
* Mapping between recipient, personality test and search gift structure.
* GraphQL - queries,mutations for updating/deleting data
* Git merge conflict - breaks the app immediately with a black screen.

## Contributing
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
If you want to contribute, please contact one of the collaborators.

## Collaborators
[Kosal Cheykim GitHub](https://github.com/kcheykim) -- [kosalcheykim@gmail.com](mailto:kosalcheykim@gmail.com)<br/>
[Kurtis Hight GitHub](https://github.com/mockcomic) -- [hightkurtis@gmail.com](mailto:hightkurtis@gmail.com)<br/>
[Jose Rivera GitHub](https://github.com/jrera1796) -- [riverajose1796@gmail.com](mailto:riverajose1796@gmail.com)<br/>
[Ching Leung GitHub](https://github.com/ricky0320) -- [ricxx0320@gmail.com](mailto:ricxx0320@gmail.com)

## WebSite
https://gift-p3.herokuapp.com/<br />
![GIFT](../assets/images/GIFT.png?raw=true)<br />