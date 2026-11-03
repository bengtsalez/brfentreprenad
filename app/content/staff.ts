/**
 * Personal som presenteras på startsidan, Så arbetar vi och Kontakt.
 * Sektionen visas bara när listan har minst en person.
 * Bilder läggs i public/images/team/ som kvadratiska WebP i 400 och 800 px.
 * `responsibility` är bekräftat ansvarsområde i en mening.
 *
 * Exempel:
 * {
 *   name: 'Förnamn Efternamn',
 *   title: 'Projektledare',
 *   phone: '070-123 45 67',
 *   email: 'fornamn@brfentreprenad.se',
 *   image: { src: '/images/team/fornamn-800.webp', srcSmall: '/images/team/fornamn-400.webp', alt: 'Porträtt av Förnamn Efternamn', width: 800, height: 800 },
 * },
 */
import type { StaffMember } from '~/types/content'

export const staff: StaffMember[] = [
  {
    name: 'Aleks Nedeljkovic',
    title: 'Projektchef',
    responsibility: 'Ansvarar för mark och totalentreprenad.',
    phone: '079-347 63 00',
    email: 'aleks@brfentreprenad.se',
    image: { src: '/images/team/aleks-800.webp', srcSmall: '/images/team/aleks-400.webp', alt: 'Porträtt av Aleks Nedeljkovic', width: 800, height: 800 },
  },
  {
    name: 'Alexandar Jokic',
    title: 'Projektledare',
    responsibility: 'Ansvarar för fasadrenovering.',
    phone: '073-659 77 07',
    email: 'alex@brfentreprenad.se',
    image: { src: '/images/team/alex-800.webp', srcSmall: '/images/team/alex-400.webp', alt: 'Porträtt av Alexandar Jokic', width: 800, height: 800 },
  },
  {
    name: 'Henrik Bengtsson',
    title: 'Verksamhetsansvarig Syd',
    responsibility: 'Ansvarar för totalentreprenader.',
    phone: '073-556 03 21',
    email: 'henrik@brfentreprenad.se',
    image: { src: '/images/team/henrik-800.webp', srcSmall: '/images/team/henrik-400.webp', alt: 'Porträtt av Henrik Bengtsson', width: 800, height: 800 },
  },
  {
    name: 'Jonas Jönsson',
    title: 'VD / Projektchef',
    responsibility: 'Ansvarar för mark och anläggning.',
    phone: '073-214 21 42',
    email: 'jonas@brfentreprenad.se',
    image: { src: '/images/team/jonas-800.webp', srcSmall: '/images/team/jonas-400.webp', alt: 'Porträtt av Jonas Jönsson', width: 800, height: 800 },
  },
]

