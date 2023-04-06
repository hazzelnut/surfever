# surfever
A sign up page for a surf trip app that never existed. 😢

=======
## Getting started

```bash
npm install

# Build the next.js files
# Start local server at http://localhost:3000
npm run prod
```

## Side-notes
This project is loosely-based on a take-home interview exercise.
I was tasked to build a login flow with a 2FA screen. And add features
that would make the user experience better than the existing one.

### Non-happy day scenarios
I hard-coded the backend to trigger some of the non-happy day scenarios.

Non happy day scenario triggers:
- Number already input -> enter ‘123-123-1234’
- Invalid 2FA code -> enter ‘AAAAAA’

### Features (Mostly for Accessbility)

General form submission
- All inputs use form and support keyboard 'Enter' and 'Tab' keys

Mobile number screen
- Reset input button
- Disabled submit button until input is full
- Input opens up the numpad on the phone (Try it on your phone by accessing the local network. Mine is 10.0.0.1:3000 once your run the prod server)

2FA screen
- 2FA input auto-submits
- Extra links for resending a new code and entering a new number
