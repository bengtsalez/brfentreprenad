/**
 * Personal som visas på kontaktsidan. Sektionen visas bara när listan
 * har minst en person. Lägg bilder i public/images/, gärna kvadratiska.
 *
 * Exempel:
 * {
 *   name: 'Förnamn Efternamn',
 *   title: 'Projektledare',
 *   phone: '070-123 45 67',
 *   email: 'fornamn@brfentreprenad.se',
 *   image: { src: '/images/byggproffs-fornamn.webp', alt: 'Förnamn Efternamn', width: 800, height: 800 },
 * },
 */
import type { StaffMember } from '~/types/content'

export const staff: StaffMember[] = [
  {
    name: 'Aleks Nedeljkovic',
    title: 'Projektchef',
    phone: '079-347 63 00',
    email: 'aleks@brfentreprenad.se',
    image: { src: '/images/byggproffs-aleks.webp', alt: 'Aleks Nedeljkovic', width: 800, height: 800 },
  },
  {
    name: 'Alexandar Jokic',
    title: 'Projektledare',
    phone: '073-659 77 07',
    email: 'alex@brfentreprenad.se',
    image: { src: '/images/byggproffs-alex.webp', alt: 'Alexandar Jokic', width: 800, height: 800 },
  },
  {
    name: 'Henrik Bengtsson',
    title: 'Marknadsansvarig',
    phone: '073-556 03 21',
    email: 'henrik@brfentreprenad.se',
    image: { src: '/images/byggproffs-henrik.webp', alt: 'Henrik Bengtsson', width: 800, height: 800 },
  },
  {
    name: 'Jonas Jönsson',
    title: 'VD / Projektchef',
    phone: '073-214 21 42',
    email: 'jonas@brfentreprenad.se',
    image: { src: '/images/byggproffs-jonas.webp', alt: 'Jonas Jönsson', width: 800, height: 800 },
  },
]

