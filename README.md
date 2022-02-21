<h1 align='center'>
  Apester Widgets
</h1>
<p align="center">
  <img alt="Reactour" title="Reactour" src="https://apester.com/wp-content/uploads/2021/07/0003_solutions-page_Publishers_4.png" width="250">
</p>

<p align='center'>
  A React component for injecting <a href='https://apester.com'>Apester</a> Units into React App.
</p>

### Usage

```bash
npm install apester-react-widgets # or yarn add apester-react-widgets
```
#### ApesterMediaWidget
```tsx
import React from 'react'
import { ApesterMediaWidget } from 'apester-react-widgets';

interface WidgetProps {
    id?: string;
    height?: string;
    className?: string;
    results?: string;
    autoCloseOnFinish?: boolean;
    autoCloseTimeout?: number;
    'data-media-id': string;
    'data-token'?: string;
    'data-campaign-id'?: string;
    'data-auto-fullscreen'?: string;
    'data-manual-top'?: string;
    'data-manual-top-desktop'?: string;
    'data-manual-top-mobile'?: string;
    'external-id'?: string;
    sandboxMode?: boolean;
    'agencyData'?: {
        agencyName: string;
        agencyImage: string;
    };
}

// Render your Apester unit
<ApesterMediaWidget data-media-id="{{apester unit id}}" />
```

#### ApesterEvent

This component injects event listener into your project.

```tsx
import React, { useCallback } from 'react'
import { ApesterEvent } from 'apester-react-widgets';

interface MessageValues {
    type: 'picked_answer' | 'refresh_companion_ad'
    data: {
        answerId: string
        answerText: string
        interactionId: string
        interactionIndex: number
        interactionTitle: string
        slideId: string
        slideTitle: string
    }
}

interface ApesterEventProps {
    callback: (data: MessageValues['data'], type: MessageValues['type']) => void;
    type: MessageValues['type']
}



const callback = useCallback((data, type) => {
    console.log('unit data', data);
    console.log('type', type);
}, []);

<ApesterEvent type="picked_answer" callback={callback} />
```

