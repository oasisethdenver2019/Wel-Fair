![Share Kit React](https://github.com/hellobloom/share-kit/raw/master/images/logo.png)

# Share Kit React

React wrapper for [Share Kit](https://github.com/hellobloom/share-kit#readme)

- [Share Kit React](#share-kit-react)
  - [Installation](#installation)
  - [Usage](#usage)
  - [More](#more)

## Installation

```
npm install --save @bloomprotocol/share-kit-react
```

## Usage

`RequestElement` will render a QR code or button based on the client's platform. By defualt it will render a button when the client is mobile or tablet and on iOS.

```tsx
import * as React from 'react'
import {RequestElement, RequestData, QROptions} from '@bloomprotocol/share-kit-react'

const requestData: RequestData = {...}
const buttonCallbackUrl = 'https://mysite.com/bloom-callback'

<RequestElement
  requestData={requestData}
  buttonCallbackUrl={buttonCallbackUrl}
/>

// Setting QR Options

const qrOptions: Partial<QROptions> = {
  size: 200,
}

<RequestElement
  requestData={requestData}
  buttonCallbackUrl={buttonCallbackUrl}
  qrOptions={qrOptions}
/>

// Overriding shouldRenderButton
<RequestElement
  requestData={requestData}
  buttonCallbackUrl={buttonCallbackUrl}
  shouldRenderButton={(parsedResult) => {
    if (parsedResult.platform.type === 'mobile') return true

    return false
  }}
/>

// Passing props to the container
<RequestElement
  requestData={requestData}
  buttonCallbackUrl={buttonCallbackUrl}
  className="request-element-container"
/>
```

## More

For more information and documentation see [Share Kit](https://github.com/hellobloom/share-kit#readme)
