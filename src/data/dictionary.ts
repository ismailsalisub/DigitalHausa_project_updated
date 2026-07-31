import { DictionaryTerm } from '../types';

export const dictionaryTerms: DictionaryTerm[] = [
  {
    id: 'algorithm',
    english: 'Algorithm',
    hausaTranslation: 'Tsarin Lissafi',
    tag: 'Programming',
    definition: {
      ha: 'Tsarin matakai-matakai don warware wata matsala.',
      en: 'A step-by-step procedure for solving a problem.'
    },
    example: {
      ha: 'Algorithm na nemi mafi girman lambobi a cikin jerin lambobi.',
      en: 'An algorithm to find the largest number in a list.'
    }
  },
  {
    id: 'array',
    english: 'Array',
    hausaTranslation: 'Jerin Bayanai',
    tag: 'Programming',
    definition: {
      ha: 'Tsarin jera bayanai masu yawa a wuri guda ta amfani da lamba.',
      en: 'A data structure that stores multiple values in a single variable using indexes.'
    },
    example: {
      ha: 'const kwayayyen = ["shayi", "kofi", "ruwa"];',
      en: 'const fruits = ["apple", "banana", "orange"];'
    }
  },
  {
    id: 'variable',
    english: 'Variable',
    hausaTranslation: "Ma'ajiyar Lamba",
    tag: 'Programming',
    definition: {
      ha: 'Wuri da aka ware don ajiye bayani mai canzawa a cikin shirin lamba.',
      en: 'A named storage location that holds a value which can change during program execution.'
    },
    example: {
      ha: 'let sunan = "Ahmad";',
      en: 'let name = "Ahmad";'
    }
  },
  {
    id: 'function',
    english: 'Function',
    hausaTranslation: 'Aiki',
    tag: 'Programming',
    definition: {
      ha: 'Bangare na lamba da ke aiwatar da wani aiki na musamman kuma yana iya amfani da shi sau da yawa.',
      en: 'A reusable block of code designed to perform a specific task.'
    },
    example: {
      ha: 'function gaishewa(suna) { return "Barka da zuwa, " + suna; }',
      en: 'function greet(name) { return "Hello, " + name; }'
    }
  },
  {
    id: 'loop',
    english: 'Loop',
    hausaTranslation: 'Maimaitawa',
    tag: 'Programming',
    definition: {
      ha: 'Tsarin lamba da ke sake aiwatar da wani bangare har zuwa lokacin da wata sharadi ta cika.',
      en: 'A programming structure that repeats a block of code until a condition is met.'
    },
    example: {
      ha: 'for (let i = 0; i < 5; i++) { console.log(i); }',
      en: 'for (let i = 0; i < 5; i++) { console.log(i); }'
    }
  },
  {
    id: 'conditional',
    english: 'Conditional',
    hausaTranslation: 'Sharadi',
    tag: 'Programming',
    definition: {
      ha: 'Wani bangare na lamba da ke aiwatar da wani aiki idan wata sharadi ta cika ko ta gaza.',
      en: 'A statement that executes different actions based on whether a condition is true or false.'
    },
    example: {
      ha: 'if (zabi > 18) { console.log("Kai manya ne"); }',
      en: 'if (age > 18) { console.log("You are an adult"); }'
    }
  },
  {
    id: 'object',
    english: 'Object',
    hausaTranslation: 'Abu',
    tag: 'Programming',
    definition: {
      ha: 'Tsarin bayani da ke rike jimillar sifofi (properties) da ayyuka (methods).',
      en: 'A data structure that contains properties (data) and methods (functions) as key-value pairs.'
    },
    example: {
      ha: 'const dalibi = { suna: "Ahmad", shekara: 20 };',
      en: 'const student = { name: "Ahmad", age: 20 };'
    }
  },
  {
    id: 'class',
    english: 'Class',
    hausaTranslation: 'Rukuni',
    tag: 'Programming',
    definition: {
      ha: 'Tsari na siffa (template) don ƙirƙirar abubuwa masu sifofi da ayyuka iri ɗaya.',
      en: 'A blueprint for creating objects with shared properties and methods.'
    },
    example: {
      ha: 'class Mota { constructor(suna) { this.suna = suna; } }',
      en: 'class Car { constructor(name) { this.name = name; } }'
    }
  },
  {
    id: 'bug',
    english: 'Bug',
    hausaTranslation: 'Kurakurai',
    tag: 'Programming',
    definition: {
      ha: 'Kuskure a cikin lamba da ke hana shirin yin aiki yadda ya kamata.',
      en: 'An error or flaw in code that causes a program to behave unexpectedly.'
    },
    example: {
      ha: 'An sami bug a cikin jerin lamba na lissafi.',
      en: 'A bug was found in the calculation logic.'
    }
  },
  {
    id: 'debug',
    english: 'Debug',
    hausaTranslation: 'Gyara Kurakurai',
    tag: 'Programming',
    definition: {
      ha: 'Aikin nemo da kuma gyara kurakurai a cikin shirin lamba.',
      en: 'The process of finding and fixing errors in a computer program.'
    },
    example: {
      ha: 'Na yi amfani da console.log don debug shirin.',
      en: 'I used console.log to debug the program.'
    }
  },
  {
    id: 'api',
    english: 'API',
    hausaTranslation: 'Hanyar Haɗin Manhaja',
    tag: 'Yanar Gizo',
    definition: {
      ha: 'Hanyar da ke ba da damar shirye-shirye daban-daban su tattauna da juna.',
      en: 'A set of rules that allows different software applications to communicate with each other.'
    },
    example: {
      ha: 'API na Google Maps yana ba da damar nuna taswiror a shafinku.',
      en: 'The Google Maps API allows you to embed maps on your website.'
    }
  },
  {
    id: 'browser',
    english: 'Browser',
    hausaTranslation: 'Burauza',
    tag: 'Yanar Gizo',
    definition: {
      ha: 'Shirin kwamfuta da ake amfani da shi don kallon shafukan yanar gizo.',
      en: 'A software application used to access and view websites on the internet.'
    },
    example: {
      ha: 'Chrome, Firefox, da Safari sune manyan burauzoji.',
      en: 'Chrome, Firefox, and Safari are major web browsers.'
    }
  },
  {
    id: 'url',
    english: 'URL',
    hausaTranslation: 'Adireshin Yanar Gizo',
    tag: 'Yanar Gizo',
    definition: {
      ha: 'Jigon adireshin da ke nuna wuri na musamman a yanar gizo.',
      en: 'The address used to access a specific resource on the internet.'
    },
    example: {
      ha: 'https://www.digitalhausa.com',
      en: 'https://www.digitalhausa.com'
    }
  },
  {
    id: 'server',
    english: 'Server',
    hausaTranslation: 'Saba',
    tag: 'Yanar Gizo',
    definition: {
      ha: 'Kwamfuta mai ba da bayanai da ayyuka ga wasu kwamfyutoci ta hanyar hanya.',
      en: 'A computer that provides data and services to other computers over a network.'
    },
    example: {
      ha: 'Sabar yanar gizo tana ba da shafukanmu ga masu ziyara.',
      en: 'The web server delivers our pages to visitors.'
    }
  },
  {
    id: 'domain',
    english: 'Domain',
    hausaTranslation: 'Yankin Yanar Gizo',
    tag: 'Yanar Gizo',
    definition: {
      ha: 'Sunan da ke nuna wani shafin yanar gizo a cikin intanet.',
      en: 'The human-readable name that identifies a website on the internet.'
    },
    example: {
      ha: 'digitalhausa.com shine yankinmu.',
      en: 'digitalhausa.com is our domain.'
    }
  },
  {
    id: 'hosting',
    english: 'Hosting',
    hausaTranslation: 'Ajiyar Shafi',
    tag: 'Yanar Gizo',
    definition: {
      ha: 'Aikin ajiye fayilolin shafin yanar gizo a kan sabar don samunwa ta intanet.',
      en: 'The service of storing website files on a server to make them accessible online.'
    },
    example: {
      ha: 'Muna amfani da Netlify don ajiyar shafinmu.',
      en: 'We use Netlify for hosting our website.'
    }
  },
  {
    id: 'responsive',
    english: 'Responsive',
    hausaTranslation: 'Mai Daidaitawa',
    tag: 'Yanar Gizo',
    definition: {
      ha: 'Tsarin shafin da ke daidaita kansa don kyalli daban-daban (waya, kwamfuta, tebur).',
      en: 'A design approach that makes web pages render well on different screen sizes and devices.'
    },
    example: {
      ha: 'Shafinmu yana da tsari mai daidaitawa don wayoyi da kwamfyutoci.',
      en: 'Our site has a responsive design for phones and computers.'
    }
  },
  {
    id: 'cookie',
    english: 'Cookie',
    hausaTranslation: 'Kuki',
    tag: 'Yanar Gizo',
    definition: {
      ha: 'Karamin fayil da burauza ke ajiye don tuna bayani game da mai amfani.',
      en: 'A small file stored by a browser to remember information about a user.'
    },
    example: {
      ha: 'Kuki yana taimakawa wajen tuna shafinku na farko.',
      en: 'Cookies help remember your preferred language.'
    }
  },
  {
    id: 'syntax',
    english: 'Syntax',
    hausaTranslation: 'Dokokin Rubutu',
    tag: "Ka'idodi",
    definition: {
      ha: "Ka'idodin yadda ake rubuta lamba cikin harshe na musamman.",
      en: 'The set of rules that defines how code must be written in a specific programming language.'
    },
    example: {
      ha: 'A cikin JavaScript, dole ne kowane umarni ya ƙare da semicolon.',
      en: 'In JavaScript, each statement should end with a semicolon.'
    }
  },
  {
    id: 'semantic-html',
    english: 'Semantic HTML',
    hausaTranslation: 'HTML Mai Ma\'ana',
    tag: "Ka'idodi",
    definition: {
      ha: "Amfani da alamomin HTML masu ma'ana don bayyana abin da ke cikin shafin.",
      en: 'Using HTML tags that convey meaning about the content they contain.'
    },
    example: {
      ha: 'Amfani da <header> maimakon <div> don sakin kan shafi.',
      en: 'Using <header> instead of <div> for the top section.'
    }
  },
  {
    id: 'accessibility',
    english: 'Accessibility',
    hausaTranslation: 'Saukin Amfani',
    tag: "Ka'idodi",
    definition: {
      ha: "Tsarin gina shafin don ya zama mai saukin amfani ga kowa har da masu nakowa.",
      en: 'Designing websites so they can be used by everyone, including people with disabilities.'
    },
    example: {
      ha: 'Saka alt text a kan hotuna don masu nakowa.',
      en: 'Adding alt text to images for screen readers.'
    }
  },
  {
    id: 'comment',
    english: 'Comment',
    hausaTranslation: "Ra'ayi",
    tag: "Ka'idodi",
    definition: {
      ha: 'Rubutu a cikin lamba da burauza ke watsarwa, amma masu tsara ke karanta shi.',
      en: 'Text in code that is ignored by the browser but readable by developers.'
    },
    example: {
      ha: '<!-- Wannan sakin kan shafi ne -->',
      en: '<!-- This is the header section -->'
    }
  },
  {
    id: 'indentation',
    english: 'Indentation',
    hausaTranslation: 'Tsari na Ciki',
    tag: "Ka'idodi",
    definition: {
      ha: 'Amfani da sarari a gaban layuka don nuna tsarin lamba.',
      en: 'Using spaces or tabs at the beginning of lines to show code structure and hierarchy.'
    },
    example: {
      ha: 'Kowane abu a cikin <body> ya kamata ya zama cikin tsari na ciki.',
      en: 'Everything inside <body> should be indented for readability.'
    }
  },
  {
    id: 'nesting',
    english: 'Nesting',
    hausaTranslation: 'Saka Ciki',
    tag: "Ka'idodi",
    definition: {
      ha: 'Saka alama a cikin wata alama don nuna alaka tsakaninsu.',
      en: 'Placing one HTML element inside another to show their relationship.'
    },
    example: {
      ha: '<ul> <li>Abu</li> </ul> — <li> yana cikin <ul>.',
      en: '<ul> <li>Item</li> </ul> — <li> is nested inside <ul>.'
    }
  },
  {
    id: 'validation',
    english: 'Validation',
    hausaTranslation: 'Tabbatarwa',
    tag: "Ka'idodi",
    definition: {
      ha: "Duba ko lambarku tana bin ka'idodin harshen da aka tsara.",
      en: 'Checking whether your code follows the rules and standards of the language.'
    },
    example: {
      ha: 'Amfani da W3C Validator don tabbatar da HTML.',
      en: 'Using the W3C Validator to check your HTML.'
    }
  }
];
export type DictionaryTag = 'all' | 'Programming' | 'Yanar Gizo' | "Ka'idodi";
