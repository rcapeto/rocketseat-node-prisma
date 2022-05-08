import { JsonObject } from 'swagger-ui-express';

export const swaggerConfig: JsonObject = {
   "openapi": "3.0.0",
   "info": {
      "title": "Manipulation deliveries API",
      "description": "This is an API Rent",
      "version": "1.0.0",
      "contact": {
         "email": "raphaelcapeto@gmail.com"
      }
   },
   "servers": [
      {
         "url": "http://localhost:3333",
         "description": "test url"
      }
   ],
   "paths": {
      "/clients/create": {
         post: {
            tags: ["Client"],
            summary: 'Create a client',
            description: 'Create a new client',
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        $ref: '#/components/schemas/CreateClientAndDeliveryMan'
                     },
                     example: {
                        username: 'foobar',
                        password: '@foobar123'
                     }
                  },
               }
            },
            responses: {
               200: {
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/Client'
                        },
                        example: {
                           data: {
                              username: 'foobar',
                              password: '@foobar123',
                              id: 'cb2d17bf-0d3a-410f-8eb3-bd5a7b72982f'
                           }
                        }
                     },
                  },
               },
               500: {
                  description: "Client already exists"
               }
            }
         }
      },
      "/clients/authenticate": {
         post: {
            tags: ["Client"],
            summary: 'Create a new token to authenticate client',
            description: 'Create a new token to authenticate client',
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        $ref: '#/components/schemas/CreateClientAndDeliveryMan'
                     },
                     example: {
                        username: 'foobar',
                        password: '@foobar123'
                     }
                  },
               }
            },
            responses: {
               200: {
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/Authenticate'
                        },
                        example: {
                           token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbGl2ZXJ5bWFuMTIzIiwiaWF0IjoxNjUxOTkxNDAxLCJleHAiOjE2NTIwNzc4MDEsInN1YiI6IjA4Y2M1NWQ1LTcyOTQtNDYxOC1hNmMwLTdhMjc3YTdhOThiMSJ9.447H59gMtrz-hc3aPXY_a2G-LOZoZowOI2OjNGA462w'
                        }
                     },
                  },
               },
               500: {
                  description: "Error authenticate Client"
               }
            }
         }
      },
      "/clients/deliveries": {
         get: {
            tags: ["Client"],
            summary: 'Get deliveries',
            description: 'Get a client deliveries',
            requestBody: {},
            "security": [{"bearerAuth": []}],
            responses: {
               200: {
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/ClientDeliveries'
                        },
                        example: {
                          data: [
                           {
                              username: 'foobar',
                              id: 'cb2d17bf-0d3a-410f-8eb3-bd5a7b72982f',
                              Deliveries: [
                                 {
                                    "id": "f19c04f4-192d-48ab-a7d0-852b30c03696",
                                    "id_client": "cb2d17bf-0d3a-410f-8eb3-bd5a7b72982f",
                                    "id_deliveryman": null,
                                    "item_name": "product test",
                                    "created_at": "2022-05-06T17:29:22.164Z",
                                    "end_at": null
                                 }
                              ]
                           }
                          ]
                        }
                     },
                  },
               },
               500: {
                  description: "Error get deliveries"
               }
            }
         }
      },
      "/deliveryman/create": {
         post: {
            tags: ["Deliveryman"],
            summary: 'Create a Deliveryman',
            description: 'Create a new deliveryman',
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        $ref: '#/components/schemas/CreateClientAndDeliveryMan'
                     },
                     example: {
                        username: 'foobar_deliveryman',
                        password: '@foobar123_deliveryman'
                     }
                  },
               }
            },
            responses: {
               200: {
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/Deliveryman'
                        },
                        example: {
                          data: {
                           username: 'foobar_deliveryman',
                           password: '@foobar123_deliveryman',
                           id: '7030a3ed-6cc7-4824-8f09-5bc06c49a1f5'
                          }
                        }
                     },
                  },
               },
               500: {
                  description: "Deliveryman already exists!"
               }
            }
         }
      },
      "/deliveryman/authenticate": {
         post: {
            tags: ["Deliveryman"],
            summary: 'Create a new token to authenticate deliveryman',
            description: 'Create a new token to authenticate deliveryman',
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        $ref: '#/components/schemas/CreateClientAndDeliveryMan'
                     },
                     example: {
                        username: 'foobar_deliveryman',
                        password: '@foobar123_deliveryman'
                     }
                  },
               }
            },
            responses: {
               200: {
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/Authenticate'
                        },
                        example: {
                           token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbGl2ZXJ5bWFuMTIzIiwiaWF0IjoxNjUxOTkxNDAxLCJleHAiOjE2NTIwNzc4MDEsInN1YiI6IjA4Y2M1NWQ1LTcyOTQtNDYxOC1hNmMwLTdhMjc3YTdhOThiMSJ9.447H59gMtrz-hc3aPXY_a2G-LOZoZowOI2OjNGA462w'
                        }
                     },
                  },
               },
               500: {
                  description: "Error authenticate Deliveryman"
               }
            }
         }
      },
      "/deliveryman/deliveries": {
         get: {
            tags: ["Deliveryman"],
            summary: 'Get deliveries',
            description: 'Get a deliveryman deliveries',
            requestBody: {},
            "security": [{"bearerAuth": []}],
            responses: {
               200: {
                  description: "Client create with success!",
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/DeliverymanDeliveries'
                        },
                        example: {
                          data: [
                             {
                                 username: 'foobar_deliveryman',
                                 id: '7030a3ed-6cc7-4824-8f09-5bc06c49a1f5',
                                 Deliveries: [
                                    {
                                       "id": "f19c04f4-192d-48ab-a7d0-852b30c03696",
                                       "id_client": "cb2d17bf-0d3a-410f-8eb3-bd5a7b72982f",
                                       "id_deliveryman": "7030a3ed-6cc7-4824-8f09-5bc06c49a1f5",
                                       "item_name": "product test",
                                       "created_at": "2022-05-06T17:29:22.164Z",
                                       "end_at": null
                                    }
                                 ]
                             }
                          ]
                        }
                     },
                  },
               },
               500: {
                  description: "Error get available deliveries"
               }
            }
         }
      },
      "/deliveries/create": {
         post: {
            tags: ["Deliveries"],
            summary: 'Create delivery',
            description: 'When client create a delivery',
            requestBody: {
               content: {
                  "application/json": {
                     schema: {
                        $ref: '#/components/schemas/CreateDelivery'
                     },
                     example: {
                        "item_name": "macbook pro m1",
                        "id_client": "27b566e6-8a46-4dcc-b3bb-8c5591780ee0"
                     }
                  },
               }
            },
            "security": [{"bearerAuth": []}],
            responses: {
               200: {
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/Deliveries'
                        },
                        example: {
                          data: {
                              "id": "96e19d9c-f96d-42ce-bc02-afb45b0c56f1",
                              "id_client": "27b566e6-8a46-4dcc-b3bb-8c5591780ee0",
                              "id_deliveryman": null,
                              "item_name": "macbook pro m1",
                              "created_at": "2022-05-07T22:02:02.904Z",
                              "end_at": null
                           }
                        }
                     },
                  },
               },
               500: {
                  description: "Error create delivery"
               }
            }
         }
      },
      "/deliveries/available": {
         get: {
            tags: ["Deliveries"],
            summary: 'Get avaiable deliveries',
            description: 'Delivery without end date and id_delivery',
            requestBody: {},
            "security": [{"bearerAuth": []}],
            responses: {
               200: {
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/Deliveries'
                        },
                        example: {
                          data: [
                            {
                              "id": "f19c04f4-192d-48ab-a7d0-852b30c03696",
                              "id_client": "cb2d17bf-0d3a-410f-8eb3-bd5a7b72982f",
                              "id_deliveryman": null,
                              "item_name": "product test",
                              "created_at": "2022-05-06T17:29:22.164Z",
                              "end_at": null
                            }
                          ]
                        }
                     },
                  },
               },
               500: {
                  description: "Error get avaiables deliveries"
               }
            }
         }
      },
      "/deliveries/updateDeliveryman/{id}": {
         put: {
            tags: ["Deliveries"],
            summary: "Update delivery",
            description: 'Put id_deliveryman in delivery',
            requestBody: {},
            "security": [{"bearerAuth": []}],
            "parameters": [
               {
                  "in": "path",
                  "name": "id",
                  "schema": {
                     "type": "string"
                  },
                  "required": true,
                  "description": "ID of the delivery to update"
               }
            ],
            responses: {
               200: {
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/DeliverymanDeliveries'
                        },
                        example: {
                           username: 'foobar_deliveryman',
                           password: '@foobar123_deliveryman',
                           id: '7030a3ed-6cc7-4824-8f09-5bc06c49a1f5',
                           Deliveries: [
                              {
                                 "id": "f19c04f4-192d-48ab-a7d0-852b30c03696",
                                 "id_client": "cb2d17bf-0d3a-410f-8eb3-bd5a7b72982f",
                                 "id_deliveryman": "7030a3ed-6cc7-4824-8f09-5bc06c49a1f5",
                                 "item_name": "product test",
                                 "created_at": "2022-05-06T17:29:22.164Z",
                                 "end_at": null
                              }
                           ]
                        }
                     },
                  },
               },
               500: {
                  description: "Error update delivery"
               }
            }
         }
      },
      "/deliveries/updateEndDate/{id}": {
         put: {
            tags: ["Deliveries"],
            summary: "Update delivery",
            description: 'Finish delivery',
            requestBody: {},
            "security": [{"bearerAuth": []}],
            "parameters": [
               {
                  "in": "path",
                  "name": "id",
                  "schema": {
                     "type": "string"
                  },
                  "required": true,
                  "description": "ID of the delivery to update"
               }
            ],
            responses: {
               200: {
                  content: {
                     "application/json": {
                        schema: {
                           $ref: '#/components/schemas/DeliverymanDeliveries'
                        },
                        example: {
                           message: 'Finish delivery'
                        }
                     },
                  },
               },
               500: {
                  description: "Error update delivery"
               }
            }
         }
      },
   },
   "components": {
      schemas: {
         CreateClientAndDeliveryMan: {
            type: 'object',
            properties: {
               username: { 
                  type: 'string'
               },
               password: { 
                  type: 'string'
               }
            }
         },
         CreateDelivery: {
            type: 'object',
            properties: {
               item_name: {
                  type: 'string'
               },
               id_client: {
                  type: 'string'
               }
            }
         },
         Client: {
            type: 'object',
            properties: {
               username: { 
                  type: 'string'
               },
               password: { 
                  type: 'string'
               },
               id: { 
                  type: 'string'
               }
            }
         },
         Deliveryman: {
            type: 'object',
            properties: {
               username: { 
                  type: 'string'
               },
               password: { 
                  type: 'string'
               },
               id: { 
                  type: 'string'
               }
            }
         },
         Authenticate: {
            type: 'object',
            properties: {
               token: {
                  type: 'string'
               }
            }
         },
         ClientDeliveries: {
            type: 'object',
            propeties: {
               username: {
                  type: 'string',
               },
               id: {
                  type: 'string',
               },
               Deliveries: {
                  type: 'array',
                  items: {
                     type: 'object',
                     properties: {
                        id: {
                           type: 'string',
                        },
                        id_client: {
                           type: 'string',
                        },
                        id_deliveryman: {
                           type: 'string',
                        },
                        item_name: {
                           type: 'string',
                        },
                        created_at: {
                           type: 'string',
                        },
                        end_at: {
                           type: 'string',
                        },
                     }
                  }
               }
            }
         },
         DeliverymanDeliveries: {
            type: 'object',
            propeties: {
               username: {
                  type: 'string',
               },
               id: {
                  type: 'string',
               },
               Deliveries: {
                  type: 'array',
                  items: {
                     type: 'object',
                     properties: {
                        id: {
                           type: 'string',
                        },
                        id_client: {
                           type: 'string',
                        },
                        id_deliveryman: {
                           type: 'string',
                        },
                        item_name: {
                           type: 'string',
                        },
                        created_at: {
                           type: 'string',
                        },
                        end_at: {
                           type: 'string',
                        },
                     }
                  }
               }
            }
         },
         Deliveries: {
            type: 'object',
            properties: {
               id: {
                  type: 'string',
               },
               id_client: {
                  type: 'string',
               },
               id_deliveryman: {
                  type: 'string',
               },
               item_name: {
                  type: 'string',
               },
               created_at: {
                  type: 'string',
               },
               end_at: {
                  type: 'string',
               },
            }
         }
      },
      "securitySchemes": {
         "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
         }
      }
   }
}