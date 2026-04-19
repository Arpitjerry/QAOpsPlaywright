Feature: Ecommerce validations

@Regression
Scenario: Placing the Order
    Given a login to Ecommerce application with "AT01010@gmail.com" and "At@12345678"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the Cart 
    When Enter valid details and Place the Order
    Then Verify order is present in the OrderHistory

@Validation
Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    |username           | password    |
    |AT01010@gmail.com  | At@12345678 |
    |abcd@gmai..com     | 123456      |
