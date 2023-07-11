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

class TestAtualizarrepublica():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_atualizarrepublica(self):
    self.driver.get("http://localhost:3000/")
    self.driver.set_window_size(1552, 832)
    self.driver.find_element(By.CSS_SELECTOR, ".hover\\3A bg-neutral-100").click()
    self.driver.find_element(By.CSS_SELECTOR, ".m-2:nth-child(2) .border-repimehardblue:nth-child(1) > button").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".m-2:nth-child(2) .border-repimehardblue:nth-child(1) > button")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".col-span-1:nth-child(1) > .rounded-xl").click()
    self.driver.find_element(By.CSS_SELECTOR, ".disable\\3Aopacity-70").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".disable\\3Aopacity-70")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    self.driver.find_element(By.ID, "residencia.end_rua").click()
    self.driver.find_element(By.ID, "residencia.end_rua").send_keys("BPS")
    self.driver.find_element(By.ID, "residencia.end_bairro").click()
    self.driver.find_element(By.ID, "residencia.end_bairro").send_keys("Cruzeiro")
    self.driver.find_element(By.ID, "residencia.end_complemento").click()
    self.driver.find_element(By.ID, "residencia.end_complemento").send_keys("Casa")
    self.driver.find_element(By.ID, "residencia.end_cep").click()
    self.driver.find_element(By.ID, "residencia.end_cep").send_keys("13990000")
    self.driver.find_element(By.ID, "residencia.end_numero").send_keys("302")
    self.driver.find_element(By.CSS_SELECTOR, ".css-qbdosj-Input").click()
    self.driver.find_element(By.ID, "residencia.end_numero").send_keys("302")
    self.driver.find_element(By.ID, "react-select-2-input").send_keys(Keys.ENTER)
    self.driver.find_element(By.CSS_SELECTOR, ".disable\\3Aopacity-70:nth-child(2)").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".disable\\3Aopacity-70:nth-child(2)")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    self.driver.find_element(By.ID, "residencia.nome").click()
    self.driver.find_element(By.CSS_SELECTOR, ".w-full:nth-child(3) > .absolute").click()
    self.driver.find_element(By.ID, "residencia.fundacao").click()
    self.driver.find_element(By.ID, "residencia.fundacao").send_keys("0002-03-28")
    self.driver.find_element(By.ID, "residencia.fundacao").send_keys("0020-03-28")
    self.driver.find_element(By.ID, "residencia.fundacao").send_keys("0200-03-28")
    self.driver.find_element(By.ID, "residencia.fundacao").send_keys("2002-03-28")
    self.driver.find_element(By.CSS_SELECTOR, ".css-qbdosj-Input").click()
    self.driver.find_element(By.ID, "residencia.fundacao").send_keys("2002-03-28")
    self.driver.find_element(By.ID, "react-select-3-input").send_keys(Keys.ENTER)
    self.driver.find_element(By.ID, "residencia.tem_garagem").click()
    self.driver.find_element(By.ID, "residencia.tem_animais").click()
    self.driver.find_element(By.CSS_SELECTOR, ".disable\\3Aopacity-70:nth-child(2)").click()
  