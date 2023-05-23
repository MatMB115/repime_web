# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestLoginsocialgoogle():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_loginsocialgoogle(self):
    self.driver.get("http://localhost:3000/")
    self.driver.set_window_size(1051, 797)
    self.driver.find_element(By.CSS_SELECTOR, ".hidden > .rounded-full").click()
    self.driver.find_element(By.CSS_SELECTOR, ".flex-col > .px-4:nth-child(1)").click()
    self.driver.find_element(By.CSS_SELECTOR, ".disable\\3Aopacity-70:nth-child(2)").click()
  
