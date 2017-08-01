@noTrackingParam @all @ODAP-1 @tracking
  Feature: NoTrackingParameterTest
  Scenario Outline:
  Given a user enters on a landing page with the parameter aw-track set to <some_value> on the query string
  When the call to the ad server is performed
  Then NoTracking value of the adserver call should be <expected_value>

  Examples:
     | some_value | expected_value |
     | invalid    | nothing        |
     | 1          | 0              |
     | 0          | 1              |
     | nothing    | nothing        |