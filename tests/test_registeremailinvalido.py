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

class TestRegisteremailinvalido():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_registeremailinvalido(self):
    self.driver.get("http://localhost:3000/")
    self.driver.set_window_size(1053, 799)
    self.driver.find_element(By.CSS_SELECTOR, ".hidden:nth-child(2)").click()
    self.driver.find_element(By.CSS_SELECTOR, ".py-3:nth-child(2)").click()
    self.driver.find_element(By.ID, "email").click()
    self.driver.find_element(By.ID, "email").send_keys("joaomarcos2803@testecom")
    self.driver.find_element(By.ID, "nome").click()
    self.driver.find_element(By.ID, "nome").send_keys("João")
    self.driver.find_element(By.ID, "senha").send_keys("Senha12345%")
    self.driver.find_element(By.ID, "contato").click()
    self.driver.find_element(By.ID, "contato").send_keys("19 989216907")
    self.driver.find_element(By.CSS_SELECTOR, ".bg-repimehardblue").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".bg-repimehardblue")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
  
