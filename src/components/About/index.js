import React from 'react'
import * as S from '../../components/Post/styles'

const About = () => (
  <>
    <S.PostHeader>
      <S.PostTitle>About me</S.PostTitle>
      <S.PostDescription>Arthur Totola Pedroti</S.PostDescription>
    </S.PostHeader>
    <S.MainContent>
      <p>
        I am the Head of Technology, a programming article writer, and actively
        involved in the Open Source community. I have 4 years of experience in
        the technology field, but I have also worked in the supply chain, import
        and export areas.
      </p>
      <h4>My experience below:👇</h4>
      <ul>
        <li>
          Open Source contributions: Material UI (Google), Next.js (Vercel),
          Chakra UI, NextAuth, Axios, Strapi, DefinitelyTyped
          (Typescript/Microsoft), React Table/Query (TanStack)
        </li>
        <li>
          +4 years: React.js, Node.js (Express), Javascript, SQL (Postgres, SQL
          Server), Git, APIs (Rest)
        </li>
        <li>
          +3 years: Typescript, Docker, Node.js (TypeORM, TSringe), Automated
          Testing / TDD (Jest), Code Styling and Standardization (ESLint,
          Prettier), CI/CD (Nginx, Github Actions, PM2), Agile Methodologies
          (Kanban), Design Systems (Material UI), Linux (Ubuntu, WSL)
        </li>
        <li>
          +2 years: React.js (Next.js), Design Systems (Storybook, Chakra UI,
          Styled Components, Bootstrap), Automated Testing / TDD (React Testing
          Library), Strapi, Cloud (AWS S3, EC2, Digital Ocean, Heroku, Netlify),
          Power Bi, Excel, Monitoring (Sentry), Agile Methodologies (Scrum)
        </li>
        <li>
          +1 year: Messaging/IoT (MQTT, RabbitMQ, Mosquitto), GraphQL, NoSQL
          (MongoDB), Cache (Redis), Mobile (React Native, PWA), Notifications
          (OneSignal), App Store (Google Play, App Center), State Management
          (Redux, Redux-Form, Redux-Persist, Redux-Thunk, Redux-Sauce), Payments
          (Stripe)
        </li>
      </ul>

      <h4>Soft Skills:</h4>
      <ul>
        <li>Self-taught</li>
        <li>Process and data organization and analysis</li>
        <li>Management and leadership</li>
      </ul>
      <h4>Others:</h4>
      <ul>
        <li>
          +4 years: Firewall (Pfsense), Networking and cabling, ERP (Protheus),
          Excel
        </li>
        <li>
          +3 years: Wordpress, Cpanel, Power Bi, DNS, Windows Server, VMware
        </li>
        <li>+2 years: VoIP, PABX, VBA (Excel)</li>
      </ul>
    </S.MainContent>
  </>
)

export default About
