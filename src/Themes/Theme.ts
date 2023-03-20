import {Platform} from 'react-native';
import 'styled-components';

export const DEFAULT_THEME = {
  /**
   * Summary these are old colors. Use Colors2 for new design system colors.
   */
  colors: {
    brand: {
      primary: {
        dark6: '#4B1583',
        dark5: '#4B2B6A',
        dark4: '#280348',
        dark3: '#28054D',
        dark3a: '#28034E',
        dark2: '#40087D',
        dark1: '#530AA0',
        main: '#731DCF',
        light: '#8C49D5',
        light1: '#F0F0F0',
        light2: '#B68BE4',
        light3: '#D9C3F1',
        light4: '#E8DEF3',
        light5: '#F3EDF9',
        light6: '#FBF6FF',
        light7: '#DBC3F4',
        light8: '#A272D1',
      },
      secondary: {
        redMain: '#C22828',
        redLight: '#F9EAEA',
        redSecondary: '#D53434',
        redSecondary10: '#D534341A',
        green: '#1A872C',
        greenMain: '#10853F',
        greenLight: '#E7F3EC',
        greenSecondary: '#097032',
        yellowSecondary: '#FFC700',
        greenSecondarya: '#1A872C',
        bluePrimary: '#007BFF',
        yellowDark: '#926902',
        yellowDarka: '#926902',
        yellowMain: '#E6AE1F',
        yellowLight: '#FDF7E9',
        yellowLighta: '#FDF7E9',
        yellow: '#E6AE1F',
        golden: '#E6AE1F',
      },
      alt: {
        dark2: '#282031',
        dark1: '#604D75',
      },
      gradients: {
        // primary: {
        //   [PlanTypeEnum.VIP]: ['#E6AE1F', '#926902'],
        //   [PlanTypeEnum.ULTIMATE]: ['#8660C6', '#351667'],
        //   whiteBgGradient: ['#FFFFFF00', '#FFFFFF'],
        //   bgGradient: ['#28044D00', '#28044D'],
        //   cardBgGradient: ['#873BDF', '#4A2476'],
        // },
        // secondary: {
        //   [PlanTypeEnum.VIP]: ['#EACF72', '#E89A3F'],
        //   [PlanTypeEnum.ULTIMATE]: ['#8660C6', '#351667'],
        // },
      },
      shadow: {
        dropShadow: '#00000016',
      },
    },
    gray: {
      darkGray0: '#212121',
      darkGray1: '#616161',
      darkGray2: '#9E9E9E',
      darkGray4: '#343A40',
      lightGray4: '#C4C4C4',
      lightGray3: '#F8F8F8',
      lightGray2: '#E0E0E0',
      lightGray1: '#F4F4F4',
      white: '#ffffff',
      opaqueWhite: '#ffffffb8',
    },
    black: {
      main: '#000000',
    },
    transparent: {
      black1: '#000000aa',
      black2: '#0000001a',
      black3: '#00000019',
      clear: '#00000000',
    },
    overlay: {
      translucent: '#00000099',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
      placeholder: '#9E9E9E',
      disabled: '#BDBDBD',
      white: '#ffffff',
      brand: '#731DCF',
      altPrimary: '#282031',
      altSecondary: '#604D75',
    },

    icon: {
      dark: '#212121',
      white: '#ffffff',
      light: '#616161',
      placeholder: '#9E9E9E',
      disabled: '#BDBDBD',
      brand: '#731DCF',
      darkBlue: '#280A48',
    },
    special: {
      whatsappBrand: '#25D366',
      whatsappGradient: '#212121',
      whatsappGray: '#212121',
      facebook: '#1877F2',
      google: '#DD4B39',
      progressBar: '#2DA85E',
      progressBarGradient: '#6FE09C',
    },
    shade1: '#142236',
    shade2: '#474B52',
    shade3: '#8C8E95',
    shade4: '#41584B',
    tint1: '#FFFFFF',
    tint2: '#313c3f',
    tint3: '#D6DBE2',
    error: '#C81717',
    errorLight: '#FFEBEF',
    success1: '#048b36',
    success2: '#ECF4EF',
    textPrimary: '#212121',
    lightPink1: '#F3EDF9',
    lightPink2: '#F4D6E8',
    light1: '#F0F0F0',
  },
  colors2: {
    background: {
      inactive: '#E0E0E0',
      base: '#F0F0F0',
      inverse: '#28034E',
      inverseLight: '#4B1583',
      brand: '#731DCF',
      brandLight: '#EFE6F9',
      negative: {
        vibrant: '#D53434',
        light: '#FFEBEF',
      },
      warning: {
        vibrant: '#FEC02D',
        light: '#FFF7E5',
      },
      positive: {
        vibrant: '#1A872C',
        light: '#E6F4E7',
      },
    },
    scrim: {
      standard: '#00000099',
    },
    surface: {
      standard: '#FFFFFF',
      subdued: '#FAFAFA',
      hovered: '#F0F0F0',
    },
    content: {
      primary: '#212121',
      secondary: '#616161',
      placeholder: '#9E9E9E',
      inactive: '#BDBDBD',
      brand: '#731DCF',
      primaryInverse: '#FFFFFF',
      secondaryInverse: '#ffffffcc',
      negative: '#B92321',
      warning: '#99631B',
      positive: '#00580E',
    },
    stroke: {
      primary: '#E0E0E0',
      brand: '#731DCF',
      negative: {
        lightAlt: '#FFCED4',
      },
      warning: {
        lightAlt: '#FFEABE',
      },
      positive: {
        lightAlt: '#C3E4C4',
      },
    },
    special: {
      whatsapp: {
        brand: '#25D366',
        gradient: 'linear-gradient(360deg, #20B038 0%, #60D66A 100%)',
        dark: '#455A64',
        gradientArr: ['#20B038', '#60D66A'],
      },
      brand: {
        google: '#DD4B39',
        facebook: '#1877F2',
      },
    },
  },
  fonts: {
    display: {
      fontWeight: '400',
      fontSize: Platform.OS === 'web' ? 32 : 28,
      lineHeight: Platform.OS === 'web' ? 40 : 32,
      letterSpacing: 0,
    },
    titleXLarge: {
      fontWeight: '600',
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0,
    },
    titleLarge: {
      fontWeight: '600',
      fontSize: Platform.OS === 'web' ? 28 : 24,
      lineHeight: 32,
      letterSpacing: 0,
    },
    titleMedium: {
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0,
    },
    titleRegular: {
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    titleSmall: {
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    bodyPrimary: {
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodySecondary: {
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    caption: {
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
    },
    tiny: {
      fontWeight: '400',
      fontSize: 10,
      lineHeight: 12,
      letterSpacing: 0,
    },

    title1: {
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
    },
    title1Mobile: {
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 30,
      letterSpacing: 0,
    },
    title2: {
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0,
    },
    title2Mobile: {
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0,
    },
    title3: {
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    title3Mobile: {
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    title4: {
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    textPlaceholder: {
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
    },
    title4Mobile: {
      fontWeight: '400',
      fontSize: 10,
      lineHeight: 16,
      letterSpacing: 0,
    },
    bodyRegularMobile: {
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 18,
      letterSpacing: 0,
    },
    bodyRegular: {
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },

    bodySmall: {
      fontWeight: '400',
      fontSize: 10,
      lineHeight: 12,
      letterSpacing: 0,
    },
    buttonLarge: {
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0,
    },
    buttonRegular: {
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    captionMobile: {
      fontWeight: '500',
      fontSize: 10,
      lineHeight: 12,
      letterSpacing: 0,
    },
    captionBold: {
      fontWeight: '700',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0,
    },
    text1Bold: {
      fontWeight: '700',
      fontSize: 10,
      lineHeight: 14,
      letterSpacing: 0,
    },
    toast: {
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    toastMobile: {
      fontWeight: '400',
      fontSize: 10,
      lineHeight: 12,
      letterSpacing: 0,
    },
  },
  buttons: {
    defaultButton: {bgColor: '#731DCF', textColor: '#fff'},
  },
  zIndexes: {
    spinner: 1,
    selectOption: 2,
    backButton: 5,
    modal: 10,
    sticky: 9,
  },
};

type MyType = typeof DEFAULT_THEME;

declare module 'styled-components' {
  export interface DefaultTheme extends MyType {}
}
