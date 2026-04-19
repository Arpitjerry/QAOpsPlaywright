Feature: Error Validation

@Validation
Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    |username           | password    |
    |AT01010@gmail.com  | At@12345678 |
    |abcd@gmai..com     | 123456      |