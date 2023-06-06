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

class TestCadastrokitnet():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_cadastrokitnet(self):
    self.driver.get("http://localhost:3000/")
    self.driver.set_window_size(1054, 800)
    self.driver.find_element(By.CSS_SELECTOR, ".font-semibold").click()
    self.driver.find_element(By.CSS_SELECTOR, ".absolute").click()
    self.driver.find_element(By.CSS_SELECTOR, ".col-span-1:nth-child(2) .font-semibold").click()
    self.driver.find_element(By.CSS_SELECTOR, ".disable\\3Aopacity-70").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".disable\\3Aopacity-70")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    self.driver.find_element(By.ID, "endereco.end_rua").click()
    self.driver.find_element(By.ID, "endereco.end_rua").send_keys("Jardim das Flores")
    self.driver.find_element(By.ID, "endereco.end_bairro").send_keys("Vista Alegre")
    self.driver.find_element(By.ID, "endereco.end_complemento").send_keys("Kitnet")
    self.driver.find_element(By.ID, "endereco.end_cep").send_keys("13990350")
    self.driver.find_element(By.ID, "endereco.end_numero").send_keys("198")
    self.driver.find_element(By.CSS_SELECTOR, ".css-qbdosj-Input").click()
    self.driver.find_element(By.ID, "react-select-2-option-1").click()
    self.driver.find_element(By.CSS_SELECTOR, ".border-repimehardblue").click()
    self.driver.find_element(By.ID, "residencia.nome").click()
    self.driver.find_element(By.ID, "residencia.nome").send_keys("Teste 1- Kitnet")
    self.driver.find_element(By.ID, "kitnet.tempo_contrato").send_keys("12")
    self.driver.find_element(By.ID, "residencia.tem_garagem").click()
    self.driver.find_element(By.ID, "residencia.e_mobiliado").click()
    self.driver.find_element(By.ID, "kitnet.tv").click()
    self.driver.find_element(By.ID, "kitnet.energia").click()
    self.driver.find_element(By.ID, "kitnet.agua").click()
    self.driver.find_element(By.ID, "kitnet.internet").click()
    self.driver.find_element(By.ID, "kitnet.fogao").click()
    self.driver.find_element(By.ID, "residencia.tem_animais").click()
    self.driver.find_element(By.CSS_SELECTOR, ".border-repimehardblue").click()
  