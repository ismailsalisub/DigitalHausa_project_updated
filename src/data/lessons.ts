import { Lesson } from '../types';

export const lessonsData: Lesson[] = [
  {
    id: 'html_introduction',
    title: {
      ha: 'Mene ne HTML?',
      en: 'What is HTML?'
    },
    metaBadge: {
      ha: 'HTML • Gabatarwa',
      en: 'HTML • Introduction'
    },
    topicTitle: {
      ha: 'Gabatarwa Zuwa HTML',
      en: 'HTML Introduction Overview'
    },
    paragraphs: [
      {
        ha: 'HTML yana nufin HyperText Markup Language. Shi ne daidaitaccen harshe da ake amfani da shi wajen gina tsari da jikin kowane shafin yanar gizo da kuke gani a intanet. Suna gaya wa burauza (browser) yadda za ta fitar da rubutu da hotuna.',
        en: 'HTML stands for HyperText Markup Language. It is the standard markup language used to create the baseline structure and skeleton of any webpage on the internet. It instructs the browser exactly how to render layouts.'
      }
    ],
    codeExample: {
      header: 'Tsarin Shafi / Basic Template',
      code: `<!DOCTYPE html>
<html>
  <body>
    <h1>Barka da zuwa!</h1>
  </body>
</html>`
    },
    explanationsHeader: {
      ha: 'Fahimtar Ginshikin:',
      en: 'Understanding the Core:'
    },
    explanations: [
      {
        term: '<!DOCTYPE html>',
        ha: 'Yana sanar da burauza cewa wannan takardar HTML5 ce.',
        en: 'Declares and defines that this document is an HTML5 source.'
      },
      {
        term: '<html>',
        ha: "Uwar gidan lambobi da ke kunshi duk abubuwan shafin.",
        en: 'The root element that wraps all code inside the document page.'
      }
    ],
    quiz: {
      question: {
        ha: "Mene ne cikakken ma'anar gajertaccen sunan HTML?",
        en: 'What does the acronym HTML stand for?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: 'HyperText Markup Language',
            en: 'HyperText Markup Language'
          },
          isCorrect: true
        },
        {
          marker: 'B',
          label: {
            ha: 'HighText Machine Language',
            en: 'HighText Machine Language'
          },
          isCorrect: false
        },
        {
          marker: 'C',
          label: {
            ha: 'Hyperlink Management Layout',
            en: 'Hyperlink Management Layout'
          },
          isCorrect: false
        }
      ]
    },
    progress: 16,
    prevLessonId: null,
    nextLessonId: 'html_elements'
  },
  {
    id: 'html_elements',
    title: {
      ha: 'Mene ne Sifofin Gida (HTML Elements)?',
      en: 'What are HTML Elements?'
    },
    metaBadge: {
      ha: 'HTML • Sifofin Gida (Elements)',
      en: 'HTML • Elements'
    },
    topicTitle: {
      ha: 'Sifofin Gida na HTML',
      en: 'HTML Elements Overview'
    },
    paragraphs: [
      {
        ha: 'Sifofin gida (Elements) su ne ginshikin kowane shafin yanar gizo. Suna gaya wa burauza (browser) yadda za ta nuna bayanan da ke cikin shafi. Suna farawa da alamar budewa, sai abun da ke ciki, sannan alamar kulawa.',
        en: 'Elements are the building blocks of any webpage. They tell the browser how to display the content within a page. They start with an opening tag, followed by the content, and end with a closing tag.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<p>Barka da zuwa DigitalHausa!</p>`
    },
    explanationsHeader: {
      ha: 'Fahimtar Lambobin:',
      en: 'Understanding the Tags:'
    },
    explanations: [
      {
        term: '<p>',
        ha: 'Alamar buɗe sakin layi (Paragraph tag).',
        en: 'The opening tag for a paragraph.'
      },
      {
        term: '</p>',
        ha: 'Alamar kulawa ta sakin layi.',
        en: 'The closing tag for a paragraph.'
      }
    ],
    quiz: {
      question: {
        ha: "Mene ne babban aikin alamar '<p>'?",
        en: "What is the primary purpose of the '<p>' tag?"
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: 'Don nuna hotuna',
            en: 'To display graphic images'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: 'Don ƙirƙirar sakin layi',
            en: 'To create a paragraph text block'
          },
          isCorrect: true
        },
        {
          marker: 'C',
          label: {
            ha: 'Don canza launi',
            en: 'To style interface colors'
          },
          isCorrect: false
        }
      ]
    },
    progress: 33,
    prevLessonId: 'html_introduction',
    nextLessonId: 'html_attributes'
  },
  {
    id: 'html_attributes',
    title: {
      ha: 'Mene ne Kayan Shafi (Attributes)?',
      en: 'What are HTML Attributes?'
    },
    metaBadge: {
      ha: 'HTML • Kayan Shafi (Attributes)',
      en: 'HTML • Attributes'
    },
    topicTitle: {
      ha: 'Kayan Shafi (Attributes)',
      en: 'HTML Attributes'
    },
    paragraphs: [
      {
        ha: 'Kayan shafi (Attributes) suna ba da ƙarin bayani game da sifofin gida (elements). Suna taimakawa wajen bayyana yadda abu ya kamata ya yi aiki. Kowane kayan shafi yana da suna da kuma daraja. Misali, idan kuna so ku saka hoto a cikin shafin, zaku yi amfani da kayan shafi src don nuna inda hoton yake, da alt don bayyana abin da ke cikin hoton.',
        en: "Attributes provide additional information about HTML elements. They help define how an element should behave. Every attribute has a name and a value. For example, when adding an image to a page, you use the src attribute to specify the image location, and alt to describe what's in the image."
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<img src="hoton.jpg" alt="Hoton gida" width="300" height="200">`
    },
    explanationsHeader: {
      ha: 'Fahimtar Kayan Shafi:',
      en: 'Understanding Attributes:'
    },
    explanations: [
      {
        term: 'src',
        ha: 'Yana nuna inda fayil ɗin yake.',
        en: 'Specifies the file location.'
      },
      {
        term: 'alt',
        ha: 'Bayyana abin da ke cikin hoton don masu nakowa.',
        en: 'Describes the image for screen readers.'
      },
      {
        term: 'width/height',
        ha: 'Saita girman hoton da pixels.',
        en: 'Sets the image size in pixels.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wani kayan shafi ne ake amfani da shi don nuna inda hoton yake?',
        en: 'Which attribute is used to specify the image source?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: 'src',
            en: 'src'
          },
          isCorrect: true
        },
        {
          marker: 'B',
          label: {
            ha: 'href',
            en: 'href'
          },
          isCorrect: false
        },
        {
          marker: 'C',
          label: {
            ha: 'alt',
            en: 'alt'
          },
          isCorrect: false
        }
      ]
    },
    progress: 38,
    prevLessonId: 'html_elements',
    nextLessonId: 'html_headings'
  },
  {
    id: 'html_headings',
    title: {
      ha: 'Mene ne Kunshiyar Rubutu?',
      en: 'What are HTML Headings?'
    },
    metaBadge: {
      ha: 'HTML • Kunshiyar Rubutu (Headings)',
      en: 'HTML • Headings'
    },
    topicTitle: {
      ha: 'Kunshiyar Rubutu (Headings)',
      en: 'HTML Headings'
    },
    paragraphs: [
      {
        ha: 'Kunshiyar rubutu (Headings) suna taimakawa wajen tsara abubuwan da ke cikin shafin yanar gizo kaɗan daga mafi muhimmanci zuwa mafi ƙaranci. HTML yana da kunshiyoyi shida daga <h1> zuwa <h6>. <h1> shine babban kunshi, kuma <h6> shine ƙanƙanin. Masu nemo bayani a yanar gizo suna amfani da waɗannan don fahimtar tsarin shafin.',
        en: 'Headings help structure webpage content from most to least important. HTML has six heading levels from <h1> to <h6>. <h1> is the main heading, and <h6> is the smallest. Search engines use these to understand page structure.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<h1>Babban Taken Shafi</h1>
<h2>Taken Ƙarami</h2>
<h3>Taken Ƙanƙana</h3>`
    },
    explanationsHeader: {
      ha: 'Fahimtar Kunshiyoyi:',
      en: 'Understanding Headings:'
    },
    explanations: [
      {
        term: '<h1>',
        ha: 'Babban taken shafi. Ana amfani da shi sau daya kawai.',
        en: 'Main page title. Use only once per page.'
      },
      {
        term: '<h2>',
        ha: 'Taken manyan sashoshi na shafi.',
        en: 'Major section headings.'
      },
      {
        term: '<h3>-<h6>',
        ha: 'Ƙananan taken ƙarƙashin sashoshi.',
        en: 'Subsection headings.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace kunshiya ce mafi girma a cikin HTML?',
        en: 'Which is the largest heading in HTML?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: '<h6>',
            en: '<h6>'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: '<h1>',
            en: '<h1>'
          },
          isCorrect: true
        },
        {
          marker: 'C',
          label: {
            ha: '<h3>',
            en: '<h3>'
          },
          isCorrect: false
        }
      ]
    },
    progress: 46,
    prevLessonId: 'html_attributes',
    nextLessonId: 'html_paragraphs'
  },
  {
    id: 'html_paragraphs',
    title: {
      ha: 'Mene ne Sakin Layi?',
      en: 'What are HTML Paragraphs?'
    },
    metaBadge: {
      ha: 'HTML • Sakin Layi (Paragraphs)',
      en: 'HTML • Paragraphs'
    },
    topicTitle: {
      ha: 'Sakin Layi (Paragraphs)',
      en: 'HTML Paragraphs'
    },
    paragraphs: [
      {
        ha: 'Sakin layi (Paragraphs) sune manyan sassa na rubutu a cikin shafin yanar gizo. Ana amfani da alamar <p> don ƙirƙirar sakin layi. Burauza (browser) yana sanya wani bango (margin) a saman da ƙasan kowane sakin layi don ya zama mai sauki karatu.',
        en: 'Paragraphs are the main blocks of text on a webpage. The <p> tag is used to create a paragraph. Browsers automatically add some margin above and below each paragraph to make reading easier.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<p>Wannan shine sakin layi na farko.</p>
<p>Wannan shine na biyu.</p>
<p>Kowane sakin layi yana da bango a saman da ƙasa.</p>`
    },
    explanationsHeader: {
      ha: 'Fahimtar Sakin Layi:',
      en: 'Understanding Paragraphs:'
    },
    explanations: [
      {
        term: '<p>',
        ha: 'Alamar sakin layi. Ana buɗe da kulawa.',
        en: 'Paragraph tag. Has opening and closing.'
      },
      {
        term: '<br>',
        ha: 'Alamar tsayawa a cikin layi (ba a buɗe ba).',
        en: 'Line break tag (self-closing).'
      },
      {
        term: '<hr>',
        ha: 'Alamar layin raba tsakanin abubuwa.',
        en: 'Horizontal rule for separating content.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace alama ake amfani da ita don sakin layi?',
        en: 'Which tag is used for paragraphs?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: '<div>',
            en: '<div>'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: '<p>',
            en: '<p>'
          },
          isCorrect: true
        },
        {
          marker: 'C',
          label: {
            ha: '<span>',
            en: '<span>'
          },
          isCorrect: false
        }
      ]
    },
    progress: 54,
    prevLessonId: 'html_headings',
    nextLessonId: 'html_links'
  },
  {
    id: 'html_links',
    title: {
      ha: 'Mene ne Hanyoyi (Links)?',
      en: 'What are HTML Links?'
    },
    metaBadge: {
      ha: 'HTML • Hanyoyi (Links)',
      en: 'HTML • Links'
    },
    topicTitle: {
      ha: 'Hanyoyi (Links)',
      en: 'HTML Links'
    },
    paragraphs: [
      {
        ha: "Hanyoyi (Links) sune abin da ke sa yanar gizo ta zama 'yanar gizo' — suna haɗa shafuka da juna. Ana amfani da alamar <a> tare da kayan shafi href don ƙirƙirar hanya. Hanyoyi suna iya kai ku zuwa wani shafi na waje, wani wuri a cikin wannan shafin, ko kuma buɗe imel.",
        en: 'Links are what make the web a "web" — they connect pages to each other. The <a> tag with the href attribute creates a link. Links can take you to an external page, a location within the same page, or open an email.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<a href="https://digitalhausa.com">Ziyarci DigitalHausa</a>

<a href="mailto:hello@digitalhausa.com">Aika Imel</a>`
    },
    explanationsHeader: {
      ha: 'Fahimtar Hanyoyi:',
      en: 'Understanding Links:'
    },
    explanations: [
      {
        term: 'href',
        ha: 'Yana nuna inda hanya take kai.',
        en: 'Specifies the link destination.'
      },
      {
        term: "target='_blank'",
        ha: 'Buɗe shafi a cikin sabon tag.',
        en: 'Opens link in a new tab.'
      },
      {
        term: 'mailto:',
        ha: 'Haɗa zuwa aika imel kai tsaye.',
        en: 'Creates an email link.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wani kayan shafi ne ake amfani da shi don nuna inda hanya take kai?',
        en: 'Which attribute specifies where a link goes?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: 'src',
            en: 'src'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: 'href',
            en: 'href'
          },
          isCorrect: true
        },
        {
          marker: 'C',
          label: {
            ha: 'alt',
            en: 'alt'
          },
          isCorrect: false
        }
      ]
    },
    progress: 62,
    prevLessonId: 'html_paragraphs',
    nextLessonId: 'html_images'
  },
  {
    id: 'html_images',
    title: {
      ha: 'Yadda Ake Saka Hotuna',
      en: 'How to Add Images'
    },
    metaBadge: {
      ha: 'HTML • Hotuna (Images)',
      en: 'HTML • Images'
    },
    topicTitle: {
      ha: 'Hotuna (Images)',
      en: 'HTML Images'
    },
    paragraphs: [
      {
        ha: 'Hotuna suna sa shafin yanar gizo ya zama mai sha\'awa. Ana amfani da alamar <img> don saka hoto. Wannan alama ba a buɗe ba — tana da kayan shafi kawai. Kayan shafi src yana nuna inda hoton yake, kuma alt yana bayyana abin da ke cikin hoton idan bai loda ba.',
        en: 'Images make webpages visually engaging. The <img> tag is used to embed an image. This tag is self-closing — it only has attributes. The src attribute specifies the image location, and alt describes the image if it fails to load.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<img src="hoton-gida.jpg" alt="Hoton gida mai kyau" width="500" height="300">`
    },
    explanationsHeader: {
      ha: 'Fahimtar Hotuna:',
      en: 'Understanding Images:'
    },
    explanations: [
      {
        term: '<img>',
        ha: 'Alamar hoto. Ba a buɗe ba (self-closing).',
        en: 'Image tag. Self-closing.'
      },
      {
        term: 'src',
        ha: 'Hanyar zuwa fayil ɗin hoton.',
        en: 'Path to the image file.'
      },
      {
        term: 'alt',
        ha: 'Bayani game da hoton don masu nakowa.',
        en: 'Description for accessibility.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace alama ake amfani da ita don saka hoto?',
        en: 'Which tag is used to embed an image?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: '<image>',
            en: '<image>'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: '<img>',
            en: '<img>'
          },
          isCorrect: true
        },
        {
          marker: 'C',
          label: {
            ha: '<pic>',
            en: '<pic>'
          },
          isCorrect: false
        }
      ]
    },
    progress: 69,
    prevLessonId: 'html_links',
    nextLessonId: 'html_lists'
  },
  {
    id: 'html_lists',
    title: {
      ha: 'Mene ne Jerarraki?',
      en: 'What are HTML Lists?'
    },
    metaBadge: {
      ha: 'HTML • Jerarraki (Lists)',
      en: 'HTML • Lists'
    },
    topicTitle: {
      ha: 'Jerarraki (Lists)',
      en: 'HTML Lists'
    },
    paragraphs: [
      {
        ha: 'Jerarraki suna taimakawa wajen tsara bayanai cikin tsari mai sauki karatu. Akwai nau\'u uku na jerarraki a cikin HTML: Jerin da ba tare da tsari ba (Unordered) — ana amfani da alamar <ul> tare da <li> don kowane abu. Jerin da aka tsara (Ordered) — ana amfani da <ol> don lambobi. Bayani (Description) — ana amfani da <dl> don suna da bayani.',
        en: 'Lists help organize information in an easy-to-read format. There are three types of lists in HTML: Unordered List — uses <ul> with <li> for each item. Ordered List — uses <ol> for numbered items. Description List — uses <dl> for terms and definitions.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<ul>
  <li>Shayi</li>
  <li>Kofi</li>
  <li>Ruwa</li>
</ul>`
    },
    explanationsHeader: {
      ha: "Nau'ukan Jerarraki:",
      en: 'Types of Lists:'
    },
    explanations: [
      {
        term: '<ul>',
        ha: 'Jerin da ba tare da tsari ba (bullet points).',
        en: 'Unordered list (bullet points).'
      },
      {
        term: '<ol>',
        ha: 'Jerin da aka tsara (1, 2, 3...).',
        en: 'Ordered list (numbered).'
      },
      {
        term: '<dl>',
        ha: 'Jerin bayani (sunaye da ma\'anoni).',
        en: 'Description list (terms & definitions).'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace alama ake amfani da ita don jerin da aka tsara?',
        en: 'Which tag creates a numbered list?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: '<ul>',
            en: '<ul>'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: '<ol>',
            en: '<ol>'
          },
          isCorrect: true
        },
        {
          marker: 'C',
          label: {
            ha: '<li>',
            en: '<li>'
          },
          isCorrect: false
        }
      ]
    },
    progress: 77,
    prevLessonId: 'html_images',
    nextLessonId: 'html_tables'
  },
  {
    id: 'html_tables',
    title: {
      ha: 'Mene ne Teburori?',
      en: 'What are HTML Tables?'
    },
    metaBadge: {
      ha: 'HTML • Teburori (Tables)',
      en: 'HTML • Tables'
    },
    topicTitle: {
      ha: 'Teburori (Tables)',
      en: 'HTML Tables'
    },
    paragraphs: [
      {
        ha: 'Teburori suna taimakawa wajen tsara bayanai cikin layuka da shuuɗe. Ana amfani da alamar <table> don ƙirƙirar teburi. Kowane teburi yana da layuka (<tr>), shuuɗe (<td>), da kuma kanun shuuɗe (<th>) don taken shuuɗe.',
        en: 'Tables help organize data into rows and columns. The <table> tag creates a table. Every table has rows (<tr>), cells (<td>), and header cells (<th>) for column titles.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<table>
  <tr>
    <th>Sunan</th>
    <th>Shekara</th>
  </tr>
  <tr>
    <td>Ahmad</td>
    <td>25</td>
  </tr>
</table>`
    },
    explanationsHeader: {
      ha: 'Fahimtar Teburori:',
      en: 'Understanding Tables:'
    },
    explanations: [
      {
        term: '<table>',
        ha: 'Uwar alamar teburi.',
        en: 'The table container.'
      },
      {
        term: '<tr>',
        ha: 'Layin teburi (Table Row).',
        en: 'Table row.'
      },
      {
        term: '<td>',
        ha: 'Shuɗin bayani (Table Data).',
        en: 'Table data cell.'
      },
      {
        term: '<th>',
        ha: 'Kanin shuɗi mai taken (Table Header).',
        en: 'Table header cell.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace alama ake amfani da ita don layin teburi?',
        en: 'Which tag creates a table row?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: '<td>',
            en: '<td>'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: '<tr>',
            en: '<tr>'
          },
          isCorrect: true
        },
        {
          marker: 'C',
          label: {
            ha: '<th>',
            en: '<th>'
          },
          isCorrect: false
        }
      ]
    },
    progress: 84,
    prevLessonId: 'html_lists',
    nextLessonId: 'html_forms'
  },
  {
    id: 'html_forms',
    title: {
      ha: 'Mene ne Fommai?',
      en: 'What are HTML Forms?'
    },
    metaBadge: {
      ha: 'HTML • Fommai (Forms)',
      en: 'HTML • Forms'
    },
    topicTitle: {
      ha: 'Fommai (Forms)',
      en: 'HTML Forms'
    },
    paragraphs: [
      {
        ha: 'Fommai suna ba da damar masu amfani su tattauna da shafin yanar gizo. Ana iya amfani da su don tattara bayanai, yin bincike, ko shiga cikin asusu. Ana amfani da alamar <form> tare da <input>, <textarea>, da <button> don gina fom.',
        en: 'Forms allow users to interact with webpages. They can be used to collect data, conduct surveys, or log into accounts. The <form> tag is used with <input>, <textarea>, and <button> to build forms.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<form action="/submit" method="POST">
  <label>Sunanku:</label>
  <input type="text" name="name">
  <button type="submit">Aika</button>
</form>`
    },
    explanationsHeader: {
      ha: 'Fahimtar Fommai:',
      en: 'Understanding Forms:'
    },
    explanations: [
      {
        term: '<form>',
        ha: 'Uwar alamar fom.',
        en: 'The form container.'
      },
      {
        term: '<input>',
        ha: 'Wurin shigar da bayani daga mai amfani.',
        en: 'User input field.'
      },
      {
        term: '<label>',
        ha: 'Bayani game da wurin shigar da bayani.',
        en: 'Describes an input field.'
      },
      {
        term: '<button>',
        ha: 'Alamar danna don aika fom.',
        en: 'Submit button.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace alama ake amfani da ita don shigar da rubutu mai tsari?',
        en: 'Which tag is used for multi-line text input?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: '<input>',
            en: '<input>'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: '<textarea>',
            en: '<textarea>'
          },
          isCorrect: true
        },
        {
          marker: 'C',
          label: {
            ha: '<text>',
            en: '<text>'
          },
          isCorrect: false
        }
      ]
    },
    progress: 90,
    prevLessonId: 'html_tables',
    nextLessonId: 'html_semantic'
  },
  {
    id: 'html_semantic',
    title: {
      ha: "Mene ne Semantic HTML?",
      en: "What is Semantic HTML?"
    },
    metaBadge: {
      ha: "HTML • Ma'anar Semantika (Semantic)",
      en: "HTML • Semantic"
    },
    topicTitle: {
      ha: "Ma'anar Semantika (Semantic HTML)",
      en: "Semantic HTML"
    },
    paragraphs: [
      {
        ha: "Semantic HTML na nufin amfani da alamomi masu ma'ana don bayyana abin da ke cikin shafin. Wannan yana taimakawa masu nakowa da kuma injunan bincike (search engines). Maimakon amfani da <div> a ko'ina, za mu iya amfani da <header>, <nav>, <main>, <article>, da <footer>.",
        en: "Semantic HTML means using meaningful tags to describe the content. This helps screen readers and search engines understand your page. Instead of using <div> everywhere, we can use <header>, <nav>, <main>, <article>, and <footer>."
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<header>
  <h1>Taken Shafi</h1>
</header>

<main>
  <article>
    <h2>Labarinmu</h2>
    <p>Wannan shine abun ciki...</p>
  </article>
</main>

<footer>
  <p>© 2026 DigitalHausa</p>
</footer>`
    },
    explanationsHeader: {
      ha: 'Alamomin Semantika:',
      en: 'Semantic Elements:'
    },
    explanations: [
      {
        term: '<header>',
        ha: 'Sashin kan shafi (logo, taken, nav).',
        en: 'Top section of page.'
      },
      {
        term: '<nav>',
        ha: 'Hanyoyin shawagi (navigation links).',
        en: 'Navigation links.'
      },
      {
        term: '<main>',
        ha: 'Babban abun cikin shafi.',
        en: 'Main content area.'
      },
      {
        term: '<article>',
        ha: 'Mai zama abu mai cin kansa (blog post, news).',
        en: 'Self-contained content.'
      },
      {
        term: '<footer>',
        ha: 'Sashin ƙasan shafi.',
        en: 'Bottom section of page.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace alama ce ta dace don hanyoyin shawagi?',
        en: 'Which element is best for navigation links?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: '<div>',
            en: '<div>'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: '<nav>',
            en: '<nav>'
          },
          isCorrect: true
        },
        {
          marker: 'C',
          label: {
            ha: '<section>',
            en: '<section>'
          },
          isCorrect: false
        }
      ]
    },
    progress: 94,
    prevLessonId: 'html_forms',
    nextLessonId: 'html_media'
  },
  {
    id: 'html_media',
    title: {
      ha: 'Saka Bidiyo da Sauti',
      en: 'Adding Audio & Video'
    },
    metaBadge: {
      ha: 'HTML • Midiya (Audio & Video)',
      en: 'HTML • Media'
    },
    topicTitle: {
      ha: 'Midiya (Audio & Video)',
      en: 'HTML Media'
    },
    paragraphs: [
      {
        ha: 'HTML5 yana ba da damar saka bidiyo da sautin kai tsaye a cikin shafin ba tare da buƙatar Adobe Flash ba. Ana amfani da alamar <video> da <audio>. Kagawa tana da kayan shafi kamar src, controls, autoplay, da loop don sarrafa yadda midiya take aiki.',
        en: 'HTML5 allows embedding audio and video directly into webpages without needing Adobe Flash. Use the <video> and <audio> tags. Each has attributes like src, controls, autoplay, and loop to control how media behaves.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `<video width="400" controls>
  <source src="bidiyo.mp4" type="video/mp4">
  Burauzarku ba ta goyon baya bidiyo.
</video>

<audio controls>
  <source src="wak.mp3" type="audio/mpeg">
</audio>`
    },
    explanationsHeader: {
      ha: 'Fahimtar Midiya:',
      en: 'Understanding Media:'
    },
    explanations: [
      {
        term: '<video>',
        ha: 'Alamar saka bidiyo.',
        en: 'Video element.'
      },
      {
        term: '<audio>',
        ha: 'Alamar saka sautin.',
        en: 'Audio element.'
      },
      {
        term: 'controls',
        ha: 'Yana nuna madannin kunna/tsayawa.',
        en: 'Shows play/pause controls.'
      },
      {
        term: '<source>',
        ha: 'Yana ba da hanyoyi daban-daban na fayil.',
        en: 'Provides multiple file formats.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace alama ake amfani da ita don saka bidiyo?',
        en: 'Which tag is used to embed video?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: '<media>',
            en: '<media>'
          },
          isCorrect: false
        },
        {
          marker: 'B',
          label: {
            ha: '<movie>',
            en: '<movie>'
          },
          isCorrect: false
        },
        {
          marker: 'C',
          label: {
            ha: '<video>',
            en: '<video>'
          },
          isCorrect: true
        }
      ]
    },
    progress: 98,
    prevLessonId: 'html_semantic',
    nextLessonId: 'html_project'
  },
  {
    id: 'html_project',
    title: {
      ha: 'Gina Shafinku na Farko!',
      en: 'Build Your First Page!'
    },
    metaBadge: {
      ha: 'HTML • Aikin Ƙarshe (Final Project)',
      en: 'HTML • Final Project'
    },
    topicTitle: {
      ha: 'Aikin Ƙarshe (Final Project)',
      en: 'Final HTML Project'
    },
    paragraphs: [
      {
        ha: 'Taya muku murna! Kun kammala darussan HTML. Yanzu zamu gina shafin yanar gizo na kanku ta amfani da duk abin da kuka koya. Shafin ya kamata ya ƙunshi: taken shafi, sakin layi, hotuna, hanyoyi, jerarraki, da kuma tsari mai ma\'ana (semantic structure).',
        en: "Congratulations! You've completed the HTML lessons. Now let's build your own webpage using everything you've learned. Your page should include: a page title, paragraphs, images, links, lists, and semantic structure."
      }
    ],
    codeExample: {
      header: 'Tsarin Shafi / Template',
      code: `<!DOCTYPE html>
<html lang="ha">
<head>
  <title>Shafina na Farko</title>
</head>
<body>
  <h1>Barka da zuwa Shafina!</h1>
  <p>Wannan shine shafina na farko.</p>
</body>
</html>`
    },
    explanationsHeader: {
      ha: 'Abubuwan da Ya Kamata a Ƙunshi:',
      en: 'What to Include:'
    },
    explanations: [
      {
        term: '<!DOCTYPE html>',
        ha: 'Sanar da HTML5.',
        en: 'Declares HTML5.'
      },
      {
        term: '<html>',
        ha: 'Uwar gidan lambobi.',
        en: 'Root element.'
      },
      {
        term: '<head>',
        ha: 'Bayanin shafi (taken, tsari).',
        en: 'Page metadata.'
      },
      {
        term: '<body>',
        ha: 'Abun da ake nuna a burauza.',
        en: 'Visible content.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace alama ce take sanar da takardar HTML5?',
        en: 'Which declaration tells the browser this is HTML5?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: '<!DOCTYPE html>',
            en: '<!DOCTYPE html>'
          },
          isCorrect: true
        },
        {
          marker: 'B',
          label: {
            ha: '<html5>',
            en: '<html5>'
          },
          isCorrect: false
        },
        {
          marker: 'C',
          label: {
            ha: '<version=5>',
            en: '<version=5>'
          },
          isCorrect: false
        }
      ]
    },
    progress: 100,
    prevLessonId: 'html_media',
    nextLessonId: null
  },
  {
    id: 'python_introduction',
    title: {
      ha: 'Gabatarwa Zuwa Python',
      en: 'Introduction to Python'
    },
    metaBadge: {
      ha: 'Python • Gabatarwa',
      en: 'Python • Introduction'
    },
    topicTitle: {
      ha: 'Bayan Shafi na Python',
      en: 'Python Backend Programming'
    },
    paragraphs: [
      {
        ha: 'Sannunku da zuwa Python! Python babban yaren programming ne na zamani wanda yake da saukin karantawa da rubutawa. Ana amfani da shi don gina bayan gizo (backend), kimiyyar bayanai (data science), da hankali na na\'ura (artificial intelligence).',
        en: 'Welcome to Python! Python is a high-level, modern programming language that is easy to read and write. It is widely used for backend web development, data science, and artificial intelligence.'
      }
    ],
    codeExample: {
      header: 'Misali / Example',
      code: `print("Barka da zuwa Python!")`
    },
    explanationsHeader: {
      ha: 'Fahimtar Python:',
      en: 'Understanding Python:'
    },
    explanations: [
      {
        term: 'print()',
        ha: 'Aiki ne da ke nuna rubutu ko sakamako a kan allon kwamfuta.',
        en: 'A function that outputs text or results to the console screen.'
      }
    ],
    quiz: {
      question: {
        ha: 'Wace kalma ce ake amfani da ita don nuna sakamako a Python?',
        en: 'Which function is used to output text in Python?'
      },
      options: [
        {
          marker: 'A',
          label: {
            ha: 'print',
            en: 'print'
          },
          isCorrect: true
        },
        {
          marker: 'B',
          label: {
            ha: 'echo',
            en: 'echo'
          },
          isCorrect: false
        },
        {
          marker: 'C',
          label: {
            ha: 'console.log',
            en: 'console.log'
          },
          isCorrect: false
        }
      ]
    },
    progress: 100,
    prevLessonId: null,
    nextLessonId: null
  }
];
