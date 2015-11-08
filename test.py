#!/usr/bin/env python
# -*- coding: utf-8 -*-


import os

import cherrypy
from cherrypy.lib.static import serve_file
import unirest

path   = os.path.abspath(os.path.dirname(__file__))
config = {
  'global' : {
    'server.socket_host' : '127.0.0.1',
    'server.socket_port' : 8080,
    'server.thread_pool' : 8
  }
}

class App:
  
  @cherrypy.expose
  def index(self):
    return serve_file(os.path.join(path, 'index.html')) 
    
  @cherrypy.expose
  @cherrypy.tools.json_out()
  def getData(self):
    return self.foo()

  def foo(self):
    response = unirest.post("https://community-sentiment.p.mashape.com/text/",
      headers={
        "X-Mashape-Key": "QFheDA3xy4msh6RQ2M5aXPqrHJJOp1b483ojsnlQEjzksKtFYu",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      params={
        "txt": "It was fucking not not fantastic"
      }
    )
	
    return response.body

if __name__ == '__main__':
  cherrypy.quickstart(App(), '/', config)
  
 

