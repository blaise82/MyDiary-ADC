# MyDiary-ADC

MyDiary is an online journal where users can pen down their thoughts and feelings.

[![Build Status](https://travis-ci.com/blaise82/MyDiary-ADC.svg?branch=develop)](https://travis-ci.com/blaise82/MyDiary-ADC)
[![Coverage Status](https://coveralls.io/repos/github/blaise82/MyDiary-ADC/badge.svg?branch=develop)](https://coveralls.io/github/blaise82/MyDiary-ADC?branch=develop)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Prerequisites
- Browser 
- Node JS "stable"
- Postman

## Getting Started
- To get started please clone this repo `https://github.com/blaise82/MyDiary-ADC`
- Run `npm install`
- Run `npm start` to start the server `8080`

### Primary links 
- Repo https://github.com/blaise82/MyDiary-ADC
- Gh-pages https://blaise82.github.io/MyDiary-ADC/ui/
- Pivotal tracker  https://www.pivotaltracker.com/n/projects/2414046
- Heroku host https://mydiary-adc-82.herokuapp.com/
- Postman documenttion v2 https://documenter.getpostman.com/view/9143901/SW14WdWU


###### Features

  1. Users can create an account.
  2. User can sign in.
  3. Users can view all entries to their diary.
  4. Users can view the contents of a diary entry.
  5. Users can add entry.
  6. Users can modify an entry.
  7. Users can delete an entry.

- Optional Features

  1. Users can set and get daily notifications that prompt them to add an entry to their diary.
  
  ###### ROUTES
  >  REMINDER ROUTE (8080) 
 local - `localhost:8080/ENDPOINT_ROUTE`
 
 if you would like to test using heroku `https://mydiary-adc-82.herokuapp.com/ENDPOINT_ROUTE`
 
 #### Version one routes (v1)
 - version one uses data structure of to store data 
  
| HTTP Method | Route                      |  End Point                                      |
| :---------- | :------------------------- | :---------------------------------------------- |
| POST        | /api/v1/auth/signup        | User can create an account                      |
| POST        | /api/v1/auth/signin        | User can sign in                                |
| POST        | /api/v1/entries            | User can add an entry in diary                  |
| PATCH       | /api/v1//entries/:id       | user can modify entry in diary                  |
| GET         | /api/v1/entries            | User can get all entries in his/her diary       |
| GET         | /api//v1/entries/:id       | User can get specific entry in his/her diary    |
| DELETE      | /api//v1/entries/:id       | User can delete specific entry in his/her diary |

 #### Version two routes (v2)
 - please install postgresql database on your laptop
 version two uses postgresql database
  
| HTTP Method | Route                      |  End Point                                      |
| :---------- | :------------------------- | :---------------------------------------------- |
| POST        | /api/v2/auth/signup        | User can create an account                      |
| POST        | /api/v2/auth/signin        | User can sign in                                |
| POST        | /api/v2/entries            | User can add an entry in diary                  |
| PATCH       | /api/v2//entries/:id       | user can modify entry in diary                  |
| GET         | /api/v2/entries            | User can get all entries in his/her diary       |
| GET         | /api//v2/entries/:id       | User can get specific entry in his/her diary    |
| DELETE      | /api//v2/entries/:id       | User can delete specific entry in his/her diary |

### Author
Name :  Izabayo Blaise
Email : izabayoblaise82@gmail.com

if you have any issies please add it https://github.com/ngirimana/MyDiary-Adc/issues
