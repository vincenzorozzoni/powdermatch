'use client'

import { useState, useEffect } from 'react'
import StoreLocator from './StoreLocator'
import SocialShare from './SocialShare'
import BrandLogo from './BrandLogo'
import RelatedProducts from './RelatedProducts'
import matchSkis from './matchSkis'

interface Product {
  brand: string
  name: string
  specs: string
  price: string
  officialLink: string
  maxisportLink: string | null
  deporvillageLink: string | null
  amazonLink: string | null
  ebayLink: string | null
}

interface ResultsProps {
  answers: Record<string, string>
  onRestart: () => void
}

const productsDB: Record<string, Product[]> = {
  pista_principiante_economico: [
    { brand: 'ROSSIGNOL', name: 'Experience 74', specs: 'Waist 74mm | Raggio 13m | Flex morbido', price: '€299', officialLink: 'https://www.rossignol.com/us-en/experience-74-xpress-RAIFG02000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+experience+74+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+experience+74+sci' },
    { brand: 'HEAD', name: 'V-Shape V2', specs: 'Waist 72mm | ERA 3.0 | Easy Turn', price: '€329', officialLink: 'https://www.head.com/en_US/product/shape-v2-315285-set', amazonLink: 'https://www.amazon.it/s?k=head+v-shape+v2+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=head+v-shape+sci' },
    { brand: 'SALOMON', name: 'S/Max 8', specs: 'Waist 74mm | Edge Amplifier | Carving', price: '€349', officialLink: 'https://www.salomon.com/en-us/shop/product/s-max-8.html', amazonLink: 'https://www.amazon.it/s?k=salomon+s+max+8+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=salomon+s+max+sci' }
  ],
  pista_principiante_medio: [
    { brand: 'ROSSIGNOL', name: 'Experience 76 Ci', specs: 'Waist 76mm | Raggio 14m | Basalt', price: '€449', officialLink: 'https://www.rossignol.com/us-en/experience-76-xpress-RAMFT04000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+experience+76+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+experience+76+sci' },
    { brand: 'ATOMIC', name: 'Cloud 9', specs: 'Donna | Waist 78mm | Dura Cap', price: '€479', officialLink: 'https://www.atomic.com/en-us/shop/product/cloud-9.html', amazonLink: 'https://www.amazon.it/s?k=atomic+cloud+9+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=atomic+cloud+9+sci' },
    { brand: 'VOLKL', name: 'Deacon 74', specs: 'Waist 74mm | 3D Radius | Precision', price: '€499', officialLink: 'https://www.voelkl.com/en-us/ski/alpine/deacon-74', amazonLink: 'https://www.amazon.it/s?k=volkl+deacon+74+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=volkl+deacon+sci' }
  ],
  pista_intermedio_medio: [
    { brand: 'ROSSIGNOL', name: 'Experience 80 Ci', specs: 'Waist 80mm | Raggio 15m | LCT', price: '€549', officialLink: 'https://www.rossignol.com/us-en/experience-80-ci-RAHNE01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+experience+80+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+experience+80+sci' },
    { brand: 'HEAD', name: 'Supershape E-Rally', specs: 'Waist 76mm | EMC | Race-like', price: '€599', officialLink: 'https://www.head.com/en_US/sports/ski/supershape', amazonLink: 'https://www.amazon.it/s?k=head+supershape+e-rally+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=head+supershape+sci' },
    { brand: 'FISCHER', name: 'RC ONE 78 GT', specs: 'Waist 78mm | Air Tec | ON-OFF Piste', price: '€579', officialLink: 'https://www.fischersports.com/en_INT/products/alpine/piste/rc-one-78-gt', amazonLink: 'https://www.amazon.it/s?k=fischer+rc+one+78+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=fischer+rc+one+sci' }
  ],
  pista_intermedio_alto: [
    { brand: 'ATOMIC', name: 'Redster X7 WB', specs: 'Waist 75mm | Race proven | Servotec', price: '€699', officialLink: 'https://www.atomic.com/en-us/shop/product/redster-x7-wb.html', amazonLink: 'https://www.amazon.it/s?k=atomic+redster+x7+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=atomic+redster+sci' },
    { brand: 'BLIZZARD', name: 'Quattro 7.4 Ti', specs: 'Waist 74mm | Titanal | IQ Control', price: '€749', officialLink: 'https://www.tecnicablizzard.com/us/products/skis/quattro-74-ti', amazonLink: 'https://www.amazon.it/s?k=blizzard+quattro+7.4+ti+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=blizzard+quattro+sci' },
    { brand: 'K2', name: 'Disruption 78Ti', specs: 'Waist 78mm | Carbon Boost | Precision', price: '€729', officialLink: 'https://k2snow.com/collections/skis/products/disruption-78ti', amazonLink: 'https://www.amazon.it/s?k=k2+disruption+78ti+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=k2+disruption+sci' }
  ],
  pista_avanzato_alto: [
    { brand: 'ROSSIGNOL', name: 'Hero Elite ST Ti', specs: 'Waist 68mm | Raggio 12m | Race DNA', price: '€799', officialLink: 'https://www.rossignol.com/us-en/hero-elite-st-ti-RALDJ01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+hero+elite+st+ti+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+hero+elite+sci' },
    { brand: 'HEAD', name: 'Supershape e-Titan', specs: 'Waist 73mm | EMC | Graphene', price: '€849', officialLink: 'https://www.head.com/en_US/sports/ski/supershape', amazonLink: 'https://www.amazon.it/s?k=head+supershape+e-titan+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=head+supershape+titan+sci' },
    { brand: 'VOLKL', name: 'Racetiger SL Pro', specs: 'Waist 65mm | Race Plate | SL Performance', price: '€879', officialLink: 'https://www.voelkl.com/en-us/ski/alpine/racetiger-sl', amazonLink: 'https://www.amazon.it/s?k=volkl+racetiger+sl+pro+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=volkl+racetiger+sci' }
  ],
  pista_avanzato_premium: [
    { brand: 'ATOMIC', name: 'Redster G9 FIS', specs: 'Waist 66mm | FIS Approved | Titanal', price: '€1099', officialLink: 'https://www.atomic.com/en-us/shop/product/redster-g9-fis.html', amazonLink: 'https://www.amazon.it/s?k=atomic+redster+g9+fis+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=atomic+redster+g9+sci' },
    { brand: 'FISCHER', name: 'RC4 The Curv DTX', specs: 'Waist 68mm | Race Carver | DTX', price: '€1149', officialLink: 'https://www.fischersports.com/en_INT/products/alpine/race/rc4-the-curv-dtx', amazonLink: 'https://www.amazon.it/s?k=fischer+rc4+curv+dtx+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=fischer+rc4+curv+sci' },
    { brand: 'ROSSIGNOL', name: 'Hero Master R22', specs: 'Waist 66mm | Raggio 13m | World Cup Tech', price: '€1299', officialLink: 'https://www.rossignol.com/us-en/hero-master-r22-RALEY01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+hero+master+r22+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+hero+master+sci' }
  ],
  // ALL-MOUNTAIN - FIXED: Correct waist for each ratio
  // 70% pista → waist 85-88mm (narrow for piste)
  // 50/50 → waist 88-92mm (balanced)
  // 30% pista (70% fuori) → waist 92-96mm (wide for powder)
  
  allmountain_intermedio_70_pista: [
    { brand: 'ROSSIGNOL', name: 'Experience 86 Basalt', specs: 'Waist 86mm | Rocker/Camber | Basalt', price: '€549', officialLink: 'https://www.rossignol.com/us-en/experience-86-basalt-RAHPA01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+experience+86+basalt+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+experience+86+sci' },
    { brand: 'SALOMON', name: 'QST 85', specs: 'Waist 85mm | C/FX | Cork Damping', price: '€589', officialLink: 'https://www.salomon.com/en-us/shop/product/qst-85.html', amazonLink: 'https://www.amazon.it/s?k=salomon+qst+85+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=salomon+qst+85+sci' },
    { brand: 'K2', name: 'Mindbender 85', specs: 'Waist 85mm | All-Terrain Rocker | Versatile', price: '€569', officialLink: 'https://k2snow.com/collections/skis/products/mindbender-85', amazonLink: 'https://www.amazon.it/s?k=k2+mindbender+85+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=k2+mindbender+sci' }
  ],
  allmountain_intermedio_50_50: [
    { brand: 'ATOMIC', name: 'Maverick 88 Ti', specs: 'Waist 88mm | Titanal | HRZN Tech', price: '€699', officialLink: 'https://www.atomic.com/en-us/shop/product/maverick-88-ti.html', amazonLink: 'https://www.amazon.it/s?k=atomic+maverick+88+ti+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=atomic+maverick+sci' },
    { brand: 'BLIZZARD', name: 'Brahma 88', specs: 'Waist 88mm | FluxForm | TrueBlend', price: '€749', officialLink: 'https://www.tecnicablizzard.com/us/products/skis/brahma-88', amazonLink: 'https://www.amazon.it/s?k=blizzard+brahma+88+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=blizzard+brahma+sci' },
    { brand: 'VOLKL', name: 'Kendo 88', specs: 'Waist 88mm | 3D Ridge | Titanal Frame', price: '€769', officialLink: 'https://www.voelkl.com/en-us/ski/alpine/kendo-88', amazonLink: 'https://www.amazon.it/s?k=volkl+kendo+88+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=volkl+kendo+sci' }
  ],
  allmountain_intermedio_30_pista: [
    { brand: 'FISCHER', name: 'Ranger 94 FR', specs: 'Waist 94mm | Freeski Rocker | Air Carbon', price: '€799', officialLink: 'https://www.fischersports.com/en_INT/products/alpine/freeride/ranger-94-fr', amazonLink: 'https://www.amazon.it/s?k=fischer+ranger+94+fr+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=fischer+ranger+sci' },
    { brand: 'SALOMON', name: 'Stance 96', specs: 'Waist 96mm | Cork Damping | Versatile', price: '€749', officialLink: 'https://www.salomon.com/en-us/shop/product/stance-96.html', amazonLink: 'https://www.amazon.it/s?k=salomon+stance+96+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=salomon+stance+sci' },
    { brand: 'HEAD', name: 'Kore 93', specs: 'Waist 93mm | Graphene | Koroyd', price: '€819', officialLink: 'https://www.head.com/en_US/sports/ski/kore', amazonLink: 'https://www.amazon.it/s?k=head+kore+93+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=head+kore+sci' }
  ],
  allmountain_avanzato_70_pista: [
    { brand: 'ATOMIC', name: 'Maverick 88 Ti', specs: 'Waist 88mm | Titanal | HRZN Tech', price: '€699', officialLink: 'https://www.atomic.com/en-us/shop/product/maverick-88-ti.html', amazonLink: 'https://www.amazon.it/s?k=atomic+maverick+88+ti+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=atomic+maverick+sci' },
    { brand: 'BLIZZARD', name: 'Brahma 88', specs: 'Waist 88mm | FluxForm | TrueBlend', price: '€749', officialLink: 'https://www.tecnicablizzard.com/us/products/skis/brahma-88', amazonLink: 'https://www.amazon.it/s?k=blizzard+brahma+88+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=blizzard+brahma+sci' },
    { brand: 'VOLKL', name: 'Kendo 88', specs: 'Waist 88mm | 3D Ridge | Titanal Frame', price: '€769', officialLink: 'https://www.voelkl.com/en-us/ski/alpine/kendo-88', amazonLink: 'https://www.amazon.it/s?k=volkl+kendo+88+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=volkl+kendo+sci' }
  ],
  allmountain_avanzato_50_50: [
    { brand: 'FISCHER', name: 'Ranger 94 FR', specs: 'Waist 94mm | Freeski Rocker | Air Carbon', price: '€799', officialLink: 'https://www.fischersports.com/en_INT/products/alpine/freeride/ranger-94-fr', amazonLink: 'https://www.amazon.it/s?k=fischer+ranger+94+fr+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=fischer+ranger+sci' },
    { brand: 'SALOMON', name: 'Stance 96', specs: 'Waist 96mm | Cork Damping | Versatile', price: '€749', officialLink: 'https://www.salomon.com/en-us/shop/product/stance-96.html', amazonLink: 'https://www.amazon.it/s?k=salomon+stance+96+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=salomon+stance+sci' },
    { brand: 'HEAD', name: 'Kore 93', specs: 'Waist 93mm | Graphene | Koroyd', price: '€819', officialLink: 'https://www.head.com/en_US/sports/ski/kore', amazonLink: 'https://www.amazon.it/s?k=head+kore+93+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=head+kore+sci' }
  ],
  allmountain_avanzato_30_pista: [
    { brand: 'ROSSIGNOL', name: 'Sender 94', specs: 'Waist 94mm | Carbon Alloy Matrix | Powder', price: '€949', officialLink: 'https://www.rossignol.com/us-en/sender-94-RAMUX01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+sender+94+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+sender+sci' },
    { brand: 'ATOMIC', name: 'Bent Chetler 100', specs: 'Waist 100mm | HRZN Tech | Signature Model', price: '€999', officialLink: 'https://www.atomic.com/en-us/shop/product/bent-chetler-100.html', amazonLink: 'https://www.amazon.it/s?k=atomic+bent+chetler+100+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=atomic+bent+chetler+sci' },
    { brand: 'K2', name: 'Mindbender 99Ti', specs: 'Waist 99mm | Titanal | All-Terrain', price: '€929', officialLink: 'https://k2snow.com/collections/skis/products/mindbender-99ti', amazonLink: 'https://www.amazon.it/s?k=k2+mindbender+99ti+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=k2+mindbender+99+sci' }
  ],
  
  // OLD KEYS - Keep for backwards compatibility but not used
  allmountain_intermedio_medio: [
    { brand: 'ROSSIGNOL', name: 'Experience 86 Basalt', specs: 'Waist 86mm | Rocker/Camber | Basalt', price: '€549', officialLink: 'https://www.rossignol.com/us-en/experience-86-basalt-RAHPA01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+experience+86+basalt+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+experience+86+sci' },
    { brand: 'SALOMON', name: 'QST 85', specs: 'Waist 85mm | C/FX | Cork Damping', price: '€589', officialLink: 'https://www.salomon.com/en-us/shop/product/qst-85.html', amazonLink: 'https://www.amazon.it/s?k=salomon+qst+85+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=salomon+qst+85+sci' },
    { brand: 'K2', name: 'Mindbender 85', specs: 'Waist 85mm | All-Terrain Rocker | Versatile', price: '€569', officialLink: 'https://k2snow.com/collections/skis/products/mindbender-85', amazonLink: 'https://www.amazon.it/s?k=k2+mindbender+85+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=k2+mindbender+sci' }
  ],
  allmountain_intermedio_alto: [
    { brand: 'ATOMIC', name: 'Maverick 88 Ti', specs: 'Waist 88mm | Titanal | HRZN Tech', price: '€699', officialLink: 'https://www.atomic.com/en-us/shop/product/maverick-88-ti.html', amazonLink: 'https://www.amazon.it/s?k=atomic+maverick+88+ti+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=atomic+maverick+sci' },
    { brand: 'BLIZZARD', name: 'Brahma 88', specs: 'Waist 88mm | FluxForm | TrueBlend', price: '€749', officialLink: 'https://www.tecnicablizzard.com/us/products/skis/brahma-88', amazonLink: 'https://www.amazon.it/s?k=blizzard+brahma+88+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=blizzard+brahma+sci' },
    { brand: 'VOLKL', name: 'Kendo 88', specs: 'Waist 88mm | 3D Ridge | Titanal Frame', price: '€769', officialLink: 'https://www.voelkl.com/en-us/ski/alpine/kendo-88', amazonLink: 'https://www.amazon.it/s?k=volkl+kendo+88+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=volkl+kendo+sci' }
  ],
  allmountain_avanzato_alto: [
    { brand: 'FISCHER', name: 'Ranger 94 FR', specs: 'Waist 94mm | Freeski Rocker | Air Carbon', price: '€799', officialLink: 'https://www.fischersports.com/en_INT/products/alpine/freeride/ranger-94-fr', amazonLink: 'https://www.amazon.it/s?k=fischer+ranger+94+fr+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=fischer+ranger+sci' },
    { brand: 'SALOMON', name: 'Stance 96', specs: 'Waist 96mm | Cork Damping | Versatile', price: '€749', officialLink: 'https://www.salomon.com/en-us/shop/product/stance-96.html', amazonLink: 'https://www.amazon.it/s?k=salomon+stance+96+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=salomon+stance+sci' },
    { brand: 'HEAD', name: 'Kore 93', specs: 'Waist 93mm | Graphene | Koroyd', price: '€819', officialLink: 'https://www.head.com/en_US/sports/ski/kore', amazonLink: 'https://www.amazon.it/s?k=head+kore+93+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=head+kore+sci' }
  ],
  allmountain_avanzato_premium: [
    { brand: 'ROSSIGNOL', name: 'Sender 94', specs: 'Waist 94mm | Carbon Alloy Matrix | Powder', price: '€949', officialLink: 'https://www.rossignol.com/us-en/sender-94-RAMUX01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+sender+94+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+sender+sci' },
    { brand: 'ATOMIC', name: 'Bent Chetler 100', specs: 'Waist 100mm | HRZN Tech | Signature Model', price: '€999', officialLink: 'https://www.atomic.com/en-us/shop/product/bent-chetler-100.html', amazonLink: 'https://www.amazon.it/s?k=atomic+bent+chetler+100+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=atomic+bent+chetler+sci' },
    { brand: 'K2', name: 'Mindbender 99Ti', specs: 'Waist 99mm | Titanal | All-Terrain', price: '€929', officialLink: 'https://k2snow.com/collections/skis/products/mindbender-99ti', amazonLink: 'https://www.amazon.it/s?k=k2+mindbender+99ti+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=k2+mindbender+99+sci' }
  ],
  freeride_principiante_medio: [
    { brand: 'ROSSIGNOL', name: 'Soul 7 HD', specs: 'Waist 106mm | Rocker/Camber | Versatile', price: '€599', officialLink: 'https://www.rossignol.com/us-en/soul-7-hd-RAMPJ01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+soul+7+hd+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+soul+7+sci' },
    { brand: 'SALOMON', name: 'QST 98', specs: 'Waist 98mm | C/FX | Cork Tips', price: '€629', officialLink: 'https://www.salomon.com/en-us/shop/product/qst-98.html', amazonLink: 'https://www.amazon.it/s?k=salomon+qst+98+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=salomon+qst+98+sci' },
    { brand: 'HEAD', name: 'Kore 99', specs: 'Waist 99mm | Graphene/Koroyd | Light', price: '€649', officialLink: 'https://www.head.com/en_US/sports/ski/kore', amazonLink: 'https://www.amazon.it/s?k=head+kore+99+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=head+kore+99+sci' }
  ],
  freeride_intermedio_alto: [
    { brand: 'BLIZZARD', name: 'Rustler 10', specs: 'Waist 102mm | FluxForm | TrueBlend', price: '€799', officialLink: 'https://www.tecnicablizzard.com/us/products/skis/rustler-10', amazonLink: 'https://www.amazon.it/s?k=blizzard+rustler+10+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=blizzard+rustler+sci' },
    { brand: 'K2', name: 'Mindbender 108Ti', specs: 'Waist 108mm | Titanal | Powder Beast', price: '€849', officialLink: 'https://k2snow.com/collections/skis/products/mindbender-108ti', amazonLink: 'https://www.amazon.it/s?k=k2+mindbender+108ti+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=k2+mindbender+108+sci' },
    { brand: 'VOLKL', name: 'Mantra 102', specs: 'Waist 102mm | Titanal Frame | Cult Classic', price: '€829', officialLink: 'https://www.voelkl.com/en-us/ski/alpine/mantra-102', amazonLink: 'https://www.amazon.it/s?k=volkl+mantra+102+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=volkl+mantra+sci' }
  ],
  freeride_esperto_alto: [
    { brand: 'ROSSIGNOL', name: 'Blackops Sender', specs: 'Waist 100mm | Carbon | Pro Level', price: '€899', officialLink: 'https://www.rossignol.com/us-en/blackops-sender-RAMUZ01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+blackops+sender+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+blackops+sci' },
    { brand: 'ATOMIC', name: 'Bent Chetler 120', specs: 'Waist 120mm | HRZN Tech | Deep Powder', price: '€949', officialLink: 'https://www.atomic.com/en-us/shop/product/bent-chetler-120.html', amazonLink: 'https://www.amazon.it/s?k=atomic+bent+chetler+120+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=atomic+bent+chetler+120+sci' },
    { brand: 'FISCHER', name: 'Ranger 102 FR', specs: 'Waist 102mm | Freeski Rocker | Carbon', price: '€869', officialLink: 'https://www.fischersports.com/en_INT/products/alpine/freeride/ranger-102-fr', amazonLink: 'https://www.amazon.it/s?k=fischer+ranger+102+fr+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=fischer+ranger+102+sci' }
  ],
  freeride_esperto_premium: [
    { brand: 'BLIZZARD', name: 'Cochise 14', specs: 'Waist 116mm | FluxForm | Big Mountain', price: '€1099', officialLink: 'https://www.tecnicablizzard.com/us/products/skis/cochise-14', amazonLink: 'https://www.amazon.it/s?k=blizzard+cochise+14+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=blizzard+cochise+sci' },
    { brand: 'K2', name: 'Reckoner 112', specs: 'Waist 112mm | Twin Rocker | Playful Powder', price: '€949', officialLink: 'https://k2snow.com/collections/skis/products/reckoner-112', amazonLink: 'https://www.amazon.it/s?k=k2+reckoner+112+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=k2+reckoner+sci' },
    { brand: 'VOLKL', name: 'Katana V-Werks', specs: 'Waist 108mm | Carbon | Ultra Light', price: '€1299', officialLink: 'https://www.voelkl.com/en-us/ski/alpine/katana-v-werks', amazonLink: 'https://www.amazon.it/s?k=volkl+katana+v-werks+sci', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=volkl+katana+sci' }
  ],
  park_economico: [
    { brand: 'ROSSIGNOL', name: 'Sprayer', specs: 'Twin-Tip | Waist 84mm | Park Ready', price: '€349', officialLink: 'https://www.rossignol.com/us-en/sprayer-RAMNB01000.html', amazonLink: 'https://www.amazon.it/s?k=rossignol+sprayer+sci+freestyle', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=rossignol+sprayer+sci' },
    { brand: 'SALOMON', name: 'NFX', specs: 'Twin-Tip | Waist 90mm | Freestyle', price: '€379', officialLink: 'https://www.salomon.com/en-us/shop/product/nfx.html', amazonLink: 'https://www.amazon.it/s?k=salomon+nfx+sci+freestyle', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=salomon+nfx+sci' },
    { brand: 'K2', name: 'Poacher', specs: 'Twin-Tip | Waist 92mm | Park/Pipe', price: '€399', officialLink: 'https://k2snow.com/collections/skis/products/poacher', amazonLink: 'https://www.amazon.it/s?k=k2+poacher+sci+freestyle', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=k2+poacher+sci' }
  ],
  park_medio: [
    { brand: 'ARMADA', name: 'ARV 86', specs: 'Twin-Tip | Waist 86mm | AR Freestyle', price: '€499', officialLink: 'https://armadaskis.com/products/arv-86', amazonLink: 'https://www.amazon.it/s?k=armada+arv+86+sci+freestyle', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=armada+arv+sci' },
    { brand: 'LINE', name: 'Chronic', specs: 'Twin-Tip | Symmetric | Butter Zone', price: '€529', officialLink: 'https://lineskis.com/products/chronic', amazonLink: 'https://www.amazon.it/s?k=line+chronic+sci+freestyle', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=line+chronic+sci' },
    { brand: 'FACTION', name: 'Prodigy 2.0', specs: 'Twin-Tip | Waist 92mm | Poplar Core', price: '€549', officialLink: 'https://factionskis.com/products/prodigy-2-0', amazonLink: 'https://www.amazon.it/s?k=faction+prodigy+2.0+sci+freestyle', usedLink: 'https://www.subito.it/annunci-italia/vendita/usato/?q=faction+prodigy+sci' }
  ]
}

export default function Results({ answers, onRestart }: ResultsProps) {
  const [loading, setLoading] = useState(true)
  const [recommendation, setRecommendation] = useState({ key: '', title: '', subtitle: '', reason: '' })
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setTimeout(() => {
      const rec = generateRecommendation()
      setRecommendation(rec)
      setProducts(getProducts(rec.key))
      setLoading(false)
    }, 2500)
  }, [])

  function generateRecommendation() {
    const terrain = answers.terrain
    const budget = answers.budget
    let level = ''
    let key = ''
    let title = ''
    let subtitle = ''
    let reason = ''

    if (terrain === 'pista') {
      level = answers.pista_level
      const turn = answers.pista_turn
      
      // Map quiz levels to database keys
      // esperto + avanzato → entrambi usano "avanzato" nel DB
      const dbLevel = (level === 'esperto' || level === 'avanzato') ? 'avanzato' : level
      key = `pista_${dbLevel}_${budget}`
      
      if (level === 'principiante') {
        title = 'Sci da Pista per Principianti'
        subtitle = 'Facili, tolleranti e perfetti per imparare'
        reason = `Come principiante su pista, hai bisogno di sci con costruzione leggera e flex morbido per un controllo semplice. ${turn === 'corte' ? 'Il raggio corto (~13m)' : turn === 'medie' ? 'Il raggio medio (~15m)' : 'Il raggio moderato'} che hai scelto permette curve ${turn === 'corte' ? 'rapide e controllate' : 'fluide e versatili'}, mentre la lunghezza più corta (10-15cm sotto altezza) facilita la manovrabilità. Il camber tradizionale offre buona presa per imparare la tecnica corretta.`
      } else if (level === 'intermedio') {
        title = 'Sci da Pista Intermedi'
        subtitle = 'Equilibrio tra performance e tolleranza'
        reason = `Come sciatore intermedio, ti servono sci con flex medio che bilanciano stabilità e reattività. ${turn === 'corte' ? 'Il raggio corto (~13m)' : turn === 'medie' ? 'Il raggio medio (~15-17m)' : 'Il raggio lungo (~19m+)'} che preferisci offre ${turn === 'corte' ? 'curve dinamiche e rapide' : turn === 'medie' ? 'versatilità in diverse condizioni' : 'stabilità ad alta velocità'}. Waist 73-78mm garantisce transizioni rapide, mentre tecnologie come ERA 3.0 o LCT migliorano presa e controllo.`
      } else {
        title = 'Sci da Pista Performance'
        subtitle = 'Precisione e potenza per sciatori esperti'
        reason = `Come sciatore avanzato/esperto, necessiti di sci con costruzioni premium (titanal, carbonio) per massima potenza e stabilità. ${turn === 'corte' ? 'Il raggio corto' : turn === 'lunghe' ? 'Il raggio lungo' : 'Il raggio medio'} offre ${turn === 'corte' ? 'agilità in curve strette' : turn === 'lunghe' ? 'velocità e fluidità in archi ampi' : 'versatilità race-like'}. Tecnologie come EMC, Servotec o IQ Control garantiscono presa di spigolo precisa anche su neve dura.`
      }
    } else if (terrain === 'allmountain') {
      level = answers.allmountain_level
      const ratio = answers.allmountain_ratio
      
      // CRITICAL FIX: Use RATIO not budget for allmountain!
      // 70_pista → waist 85-88mm
      // 50_50 → waist 88-92mm  
      // 30_pista → waist 92-96mm
      key = `allmountain_${level}_${ratio}`
      
      title = 'Sci All-Mountain Versatili'
      subtitle = 'Perfetti per pista e fuoripista'
      
      if (ratio === '70_pista') {
        reason = `Passando il 70% del tempo su pista, ti servono sci all-mountain con waist 85-88mm per buone transizioni ma capaci fuori pista. Profilo rocker/camber (rocker punta + camber centrale) offre presa su battuto e facilità in neve variabile. ${level === 'intermedio' ? 'Flex medio per progressione' : 'Costruzioni titanal per potenza'}.`
      } else if (ratio === '50_50') {
        reason = `Con split 50/50 pista/fuori, necessiti di veri all-mountain con waist 88-94mm. Equilibrio perfetto tra agilità su battuto e galleggiamento in fresca. ${level === 'intermedio' ? 'Tecnologie C/FX o Basalt per versatilità' : 'HRZN Tech o FluxForm per performance top'}.`
      } else {
        reason = `Passando il 70% fuoripista, ti servono all-mountain orientati freeride con waist 92-96mm. Maggiore galleggiamento in neve fresca mantenendo gestibilità su pista. ${level === 'intermedio' ? 'Cork damping e profili playful' : 'Carbon e costruzioni premium per terreni impegnativi'}.`
      }
    } else if (terrain === 'freeride') {
      level = answers.freeride_level
      const freerrain = answers.freeride_terrain
      
      // Fix: map intermediate correctly!
      let dbLevel = level
      if (level === 'principiante') dbLevel = 'principiante'
      else if (level === 'intermedio') dbLevel = 'intermedio'
      else if (level === 'esperto') dbLevel = 'esperto'
      
      // CRITICAL FIX: Map budget to available database keys
      // Freeride database only has: principiante_medio, intermedio_alto, esperto_alto, esperto_premium
      let dbBudget = budget
      if (dbLevel === 'principiante') {
        // Principiante only has 'medio'
        dbBudget = 'medio'
      } else if (dbLevel === 'intermedio') {
        // Intermedio only has 'alto'
        dbBudget = 'alto'
      } else if (dbLevel === 'esperto') {
        // Esperto has 'alto' and 'premium'
        dbBudget = (budget === 'premium') ? 'premium' : 'alto'
      }
      
      key = `freeride_${dbLevel}_${dbBudget}`
      
      title = `Sci Freeride ${level === 'esperto' ? 'Expert' : level === 'intermedio' ? 'Intermedi' : 'Entry Level'}`
      subtitle = 'Per neve fresca e fuoripista'
      
      if (level === 'principiante') {
        reason = `Come principiante freeride su ${freerrain === 'dolce' ? 'pendii dolci' : 'terreni misti'}, ti servono sci con waist 98-102mm per galleggiamento senza essere troppo impegnativi. Rocker in punta + camber facilita manovre mantenendo presa. Costruzione leggera e playful per imparare con sicurezza.`
      } else if (level === 'intermedio') {
        reason = `Come freerider intermedio su ${freerrain === 'dolce' ? 'boschi e pendii moderati' : freerrain === 'misto' ? 'terreni vari' : 'linee impegnative'}, necessiti waist 100-110mm. Doppio rocker per maneggevolezza, ${freerrain === 'ripido' ? 'costruzioni rigide per controllo' : 'profili versatili'}. Cork damping o tecnologie Air Carbon per smorzamento.`
      } else {
        reason = `Come esperto freeride su ${freerrain === 'ripido' ? 'linee esposte e ripide' : 'terreni estremi'}, servono sci waist 108-120mm con costruzioni premium. ${freerrain === 'ripido' ? 'Camber per presa su neve dura' : 'Full rocker per powder profondo'}. Carbon, titanal, HRZN Tech per potenza massima. Lunghezza vicina o superiore ad altezza per stabilità ad alta velocità.`
      }
    } else if (terrain === 'park') {
      const parkstyle = answers.park_style
      key = `park_${budget}`
      title = 'Sci Freestyle per Park'
      subtitle = 'Twin-tip per tricks e creatività'
      reason = `Per ${parkstyle === 'rail' ? 'rail e jib' : parkstyle === 'jump' ? 'salti e kicker' : 'park completo'}, ti servono twin-tip con ${parkstyle === 'rail' ? 'flex morbido per presse e butter' : parkstyle === 'jump' ? 'flex medio per pop su kicker' : 'flex versatile'}. Design simmetrico, rocker pronunciato, costruzione leggera. ${parkstyle === 'rail' ? 'Butter zones e profili playful' : parkstyle === 'jump' ? 'Pop e stabilità in atterraggio' : 'AR Freestyle o Symmetric Flex'}.`
    }

    console.log('Generated key:', key, 'from answers:', answers) // Debug log
    return { key, title, subtitle, reason }
  }

  function getProducts(key: string): Product[] {
    // Try new matching system first
    const matchResult = matchSkis(answers as any)
    
    if (matchResult.success && matchResult.skis && matchResult.skis.length > 0) {
      // Convert matchSkis format to Product format
      return matchResult.skis.map(ski => ({
        brand: ski.brand,
        name: ski.name,
        specs: ski.specs,
        price: `€${ski.price_min}-${ski.price_max}`,
        officialLink: ski.officialLink,
        maxisportLink: ski.maxisportLink,
        deporvillageLink: ski.deporvillageLink,
        amazonLink: ski.amazonLink,
        ebayLink: ski.ebayLink
      }))
    }
    
    // Fallback to old database if matching fails
    return productsDB[key] || productsDB['pista_principiante_economico']
  }

  if (loading) {
    return (
      <section className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto px-8 text-center py-16">
          <div className="w-12 h-12 border-4 rounded-full mx-auto mb-6 animate-spin" style={{ 
            borderColor: '#F8F9FA',
            borderTopColor: '#0D47A1'
          }} />
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#1A1A1A' }}>Analizzando il tuo profilo...</h3>
          <p style={{ color: '#6C757D' }}>Stiamo confrontando le tue risposte con migliaia di modelli di sci</p>
        </div>
      </section>
    )
  }

  const productNames = products.map(p => `${p.brand} ${p.name}`)
  const budgetRange = answers.budget === 'economico' ? '€200-400' : answers.budget === 'medio' ? '€400-600' : answers.budget === 'alto' ? '€600-900' : '€900+'

  return (
    <section className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'white' }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-white p-12 rounded-2xl text-center mb-12" style={{
          background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)'
        }}>
          <h2 className="text-4xl font-bold mb-4">{recommendation.title}</h2>
          <p className="text-xl mb-8 opacity-95">{recommendation.subtitle}</p>
          <div className="p-8 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-2xl font-bold mb-4">Perché questi sci?</h3>
            <p className="text-lg leading-relaxed">{recommendation.reason}</p>
          </div>
          
          {/* Scroll hint */}
          <div className="mt-6">
            <p className="text-sm font-semibold opacity-90">
              ↓ I tuoi 3 sci perfetti ↓
            </p>
          </div>
        </div>

        {/* Main product recommendations - FIRST! */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {products.map((p, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-full h-56 p-4" style={{ backgroundColor: '#F8F9FA' }}>
                <BrandLogo brand={p.brand} className="w-full h-full" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold mb-2" style={{ 
                  color: '#FF6B35',
                  letterSpacing: '1px'
                }}>{p.brand}</div>
                <h4 className="text-xl font-bold mb-3" style={{ color: '#1A1A1A' }}>{p.name}</h4>
                <p className="text-sm mb-6" style={{ color: '#6C757D' }}>{p.specs}</p>
                
                {/* Three Buttons */}
                <div className="flex flex-col gap-2">
                  {/* Official Site */}
                  <a 
                    href={p.officialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-lg transition-all"
                    style={{ backgroundColor: '#0D47A1' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0A3A87'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0D47A1'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-4.52 0-8-3.48-8-8V8.3l8-4.62 8 4.62V12c0 4.52-3.48 8-8 8z"/>
                    </svg>
                    Sito Ufficiale
                  </a>
                  
                  {/* Maxisport - Coming Soon */}
                  <button 
                    disabled
                    className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-lg transition-all opacity-50 cursor-not-allowed"
                    style={{ backgroundColor: '#6B7280' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                    </svg>
                    Maxisport (Prossimamente)
                  </button>
                  
                  {/* Deporvillage - Coming Soon */}
                  <button 
                    disabled
                    className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-lg transition-all opacity-50 cursor-not-allowed"
                    style={{ backgroundColor: '#6B7280' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                    </svg>
                    Deporvillage (Prossimamente)
                  </button>
                  
                  {/* Amazon - Coming Soon */}
                  <button 
                    disabled
                    className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-lg transition-all opacity-50 cursor-not-allowed"
                    style={{ backgroundColor: '#6B7280' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    Amazon (Prossimamente)
                  </button>
                  
                  {/* eBay - Coming Soon */}
                  <button 
                    disabled
                    className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-lg transition-all opacity-50 cursor-not-allowed"
                    style={{ backgroundColor: '#6B7280' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M19 1H5c-1.1 0-1.99.9-1.99 2L3 15.93c0 .69.35 1.3.88 1.66L12 23l8.11-5.41c.53-.36.88-.97.88-1.66L21 3c0-1.1-.9-2-2-2zm-7 19.6l-7-4.66V3h14v12.93l-7 4.67zm-2.01-7.42l-2.58-2.59L6 12l4 4 8-8-1.42-1.42z"/>
                    </svg>
                    eBay Usato (Prossimamente)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Related products - compact section */}
        <RelatedProducts terrain={answers.terrain} level={answers.pista_level || answers.allmountain_level || answers.freeride_level || 'intermedio'} />

        {/* Social share */}
        <SocialShare productNames={productNames} budgetRange={budgetRange} />

        {/* Store locator */}
        <StoreLocator />

        <div className="text-center mt-12">
          <button
            onClick={onRestart}
            className="px-8 py-4 rounded-lg text-white font-bold text-lg transition-all hover:-translate-y-1 flex items-center gap-3 mx-auto"
            style={{ backgroundColor: '#FF6B35' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E85A28'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FF6B35'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12C4 7.58172 7.58172 4 12 4C14.5264 4 16.7792 5.17108 18.2454 7M20 12C20 16.4183 16.4183 20 12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 3V7H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 21V17H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ricomincia il Test
          </button>
        </div>
      </div>
    </section>
  )
}
