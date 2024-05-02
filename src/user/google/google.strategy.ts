// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-google-oauth20';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor() {
//     super({
//       clientID: "324450729321-kvcpsj56386lpeic528k9cdvio4j88u1.apps.googleusercontent.com",
//       clientSecret: "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",
//       callbackURL: 'http://localhost:3000/auth/google/callback',
//       scope: ['email', 'profile'],
//     });
//   }

//   // make sure to add this or else you won't get the refresh token
//   authorizationParams(): { [key: string]: string } {
//     return {
//       access_type: 'offline',
//       prompt: 'consent',
//     };
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: any,
//   ) {
//     const { name, emails, photos } = profile;

//     const user = {
//       email: emails[0].value,
//       firstName: name.givenName,
//       lastName: name.familyName,
//       picture: photos[0].value,
//       accessToken,
//       refreshToken,
//     };

//     done(null, user);
//   }
// }