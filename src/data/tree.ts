import { TreeBranch } from '../types';
import computerBasicsImg from '../assets/images/computer_basics_vector_1784699007583.jpg';
import internetImg from '../assets/images/internet_vector_1784699020306.jpg';
import emailImg from '../assets/images/email_vector_1784699033325.jpg';
import filesFoldersImg from '../assets/images/files_folders_vector_1784699045062.jpg';
import foundationVectorImg from '../assets/images/foundation_vector_1784697670205.jpg';
import heroTechVectorImg from '../assets/images/hero_tech_vector_1784697708166.jpg';
import wordImg from '../assets/images/word_vector_1784699062379.jpg';
import excelImg from '../assets/images/excel_vector_1784699072226.jpg';
import powerpointImg from '../assets/images/powerpoint_vector_1784699083369.jpg';
import gdocsImg from '../assets/images/gdocs_vector_1784699095362.jpg';
import officeVectorImg from '../assets/images/office_vector_1784697682879.jpg';
import programmingVectorImg from '../assets/images/programming_vector_1784697694312.jpg';
import htmlImg from '../assets/images/html_vector_1784699110383.jpg';
import cssImg from '../assets/images/css_vector_1784699120832.jpg';
import jsImg from '../assets/images/js_vector_1784699130731.jpg';
import pythonImg from '../assets/images/python_vector_1784699142114.jpg';

export const treeBranches: TreeBranch[] = [
  {
    id: 'foundation',
    title: {
      ha: 'Asasi (Foundation)',
      en: 'Foundation'
    },
    icon: '🌱',
    subBranches: [
      {
        id: 'computer_basics',
        title: {
          ha: "Ka'idodin Kwamfuta",
          en: 'Computer Basics'
        },
        icon: '🖥️',
        illustrationImg: computerBasicsImg,
        leaves: [
          {
            title: { ha: 'Menene Kwamfuta?', en: 'What is a Computer?' },
            lessonId: 'computer_what_is',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar abin da kwamfuta take yi da kuma yadda take aiki.', en: 'Understanding what a computer is and how it works.' }
          },
          {
            title: { ha: 'Irin Kwamfutoci', en: 'Types of Computers' },
            lessonId: 'computer_types',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: "Duba nau'o'in kwamfutoci daban-daban.", en: 'Explore different types of computers.' }
          },
          {
            title: { ha: 'Sassan Kwamfuta', en: 'Parts of a Computer' },
            lessonId: 'computer_parts',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Gano sassan kwamfuta masu muhimmanci.', en: 'Identify the essential parts of a computer.' }
          },
          {
            title: { ha: 'Hardware vs Software', en: 'Hardware vs Software' },
            lessonId: 'computer_hardware_vs_software',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Bambanci tsakanin kayan aiki da manhajoji.', en: 'Distinguish between hardware and software.' }
          },
          {
            title: { ha: "Na'urorin Shigarwa", en: 'Input Devices' },
            lessonId: 'computer_input_devices',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: "Koyo game na'urorin shigarwa kamar keyboard da mouse.", en: 'Learn about input devices like keyboard and mouse.' }
          },
          {
            title: { ha: "Na'urorin Fitowa", en: 'Output Devices' },
            lessonId: 'computer_output_devices',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: "Koyo game na'urorin fitowa kamar monitor da printer.", en: 'Learn about output devices like monitor and printer.' }
          },
          {
            title: { ha: "Na'urorin Ajiya", en: 'Storage Devices' },
            lessonId: 'computer_storage',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar yadda ake adana bayanai a kwamfuta.', en: 'Understand how data is stored on computers.' }
          },
          {
            title: { ha: 'Tunarwa (RAM & ROM)', en: 'Memory (RAM & ROM)' },
            lessonId: 'computer_memory',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Bambanci tsakanin RAM da ROM.', en: 'Distinguish between RAM and ROM.' }
          },
          {
            title: { ha: 'Tsarin Aiki (OS)', en: 'Operating Systems' },
            lessonId: 'computer_os',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Koyo game tsarin aiki kamar Windows da Linux.', en: 'Learn about operating systems like Windows and Linux.' }
          },
          {
            title: { ha: 'Zamoni na Kwamfuta', en: 'Computer Generations' },
            lessonId: 'computer_generations',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Tarihin ci gaban kwamfuta daga farko zuwa yanzu.', en: 'History of computer evolution from first to present.' }
          }
        ]
      },
      {
        id: 'using_computer',
        title: {
          ha: 'Amfani da Kwamfuta',
          en: 'Using a Computer'
        },
        icon: '🖱️',
        illustrationImg: computerBasicsImg,
        leaves: [
          {
            title: { ha: 'Kunna & Kashe Kwamfuta', en: 'Turning On & Off' },
            lessonId: 'using_turn_on_off',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Yadda ake kunna da kashe kwamfuta daidai.', en: 'How to properly turn on and off a computer.' }
          },
          {
            title: { ha: 'Teburin Kwamfuta (Desktop)', en: 'Desktop Navigation' },
            lessonId: 'using_desktop',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar abubuwan da ke kan teburin kwamfuta.', en: 'Understanding items on the computer desktop.' }
          },
          {
            title: { ha: 'Amfani da Windows', en: 'Using Windows' },
            lessonId: 'using_windows',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Amfani da tagogin Windows da kuma tsarinsu.', en: 'Using Windows and managing active windows.' }
          },
          {
            title: { ha: 'Gwajin Mouse', en: 'Mouse Skills' },
            lessonId: 'using_mouse',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Yadda ake amfani da mouse cikin kyau.', en: 'How to use a mouse properly.' }
          },
          {
            title: { ha: 'Kwarewa a Keyboard', en: 'Keyboard Basics' },
            lessonId: 'using_keyboard',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Gano kowane bature a keyboard da aikinsa.', en: 'Learn every key on the keyboard and its function.' }
          }
        ]
      },
      {
        id: 'internet',
        title: {
          ha: 'Intanet (Internet)',
          en: 'Internet'
        },
        icon: '🌐',
        illustrationImg: internetImg,
        leaves: [
          {
            title: { ha: 'Menene Intanet?', en: 'What is the Internet?' },
            lessonId: 'internet_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar tsarin hanyoyin sadarwa na yanar gizo.', en: 'Understanding how global computer networks connect.' }
          },
          {
            title: { ha: 'Manhajojin Bincike (Web Browsers)', en: 'Web Browsers' },
            lessonId: 'internet_browsers',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Amfani da Chrome, Edge da sauran manhajojin bincike.', en: 'Using web browsers like Chrome, Edge, and Firefox.' }
          },
          {
            title: { ha: 'Bincike a Google', en: 'Searching the Web' },
            lessonId: 'internet_searching',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Yadda ake bincika bayanai a Google cikin sauki da sauri.', en: 'How to effectively search for information online.' }
          },
          {
            title: { ha: 'Shafukan Yanar Gizo & Adireshinsu', en: 'Websites & URLs' },
            lessonId: 'internet_urls',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar adireshin intanet kamar .com, .org, da .edu.', en: 'Understanding URLs and domain extensions.' }
          }
        ]
      },
      {
        id: 'email',
        title: {
          ha: 'Sakon Imel (Email)',
          en: 'Email'
        },
        icon: '✉️',
        illustrationImg: emailImg,
        leaves: [
          {
            title: { ha: 'Menene Imel?', en: 'What is Email?' },
            lessonId: 'email_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar aikin sakon gizo da amfaninsa a rayuwa da aiki.', en: 'Understanding electronic mail and its benefits.' }
          },
          {
            title: { ha: 'Buɗe Asusun Imel (Gmail)', en: 'Creating an Email Account' },
            lessonId: 'email_create',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Yadda ake buɗe sabon asusun Gmail cikin sauki.', en: 'Step-by-step guide to creating a Gmail account.' }
          },
          {
            title: { ha: 'Aikawa & Karɓar Sakonni', en: 'Sending & Receiving Emails' },
            lessonId: 'email_send_receive',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Rubuta sako, shigar da adireshi da amsa sako.', en: 'Composing, sending, and replying to messages.' }
          },
          {
            title: { ha: 'Haɗa Fayiloli (Attachments)', en: 'Email Attachments' },
            lessonId: 'email_attachments',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Haɗa hotuna da takardu a sakon imel.', en: 'Attaching documents and images to your email.' }
          }
        ]
      },
      {
        id: 'files',
        title: {
          ha: 'Fayiloli (Files & Folders)',
          en: 'Files'
        },
        icon: '📁',
        illustrationImg: filesFoldersImg,
        leaves: [
          {
            title: { ha: 'Fahimtar Fayiloli & Foldobi', en: 'Understanding Files & Folders' },
            lessonId: 'files_understanding',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Bambanci tsakanin fayil da folda a kwamfuta.', en: 'Difference between files and folder directories.' }
          },
          {
            title: { ha: 'Kirƙira & Sake Suna', en: 'Creating & Renaming' },
            lessonId: 'files_management',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Kirƙirar sabuwar folda da sake mata suna.', en: 'Creating new folders and renaming your files.' }
          },
          {
            title: { ha: 'Kwandafi da Ɗaukar Fayil', en: 'Copying & Moving Files' },
            lessonId: 'files_copy_move',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Amfani da Copy, Cut, da Paste a kan fayiloli.', en: 'Copying, cutting, and pasting files across drives.' }
          },
          {
            title: { ha: 'Ajiya a Intanet (Cloud Storage)', en: 'Cloud Storage Basics' },
            lessonId: 'files_cloud',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Adana fayiloli a Google Drive ko OneDrive.', en: 'Storing files safely on Google Drive or OneDrive.' }
          }
        ]
      },
      {
        id: 'typing',
        title: {
          ha: 'Buga Rubutu (Typing)',
          en: 'Typing'
        },
        icon: '⌨️',
        illustrationImg: foundationVectorImg,
        leaves: [
          {
            title: { ha: 'Sanya Hannaye a Keyboard', en: 'Proper Hand Placement' },
            lessonId: 'typing_hand_position',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Sanya yatsun hannu a jerin Home Row (A S D F - J K L ;).', en: 'Positioning your fingers on the Home Row keys.' }
          },
          {
            title: { ha: 'Sauri & Daidaito', en: 'Typing Speed & Accuracy' },
            lessonId: 'typing_speed',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Koyi buga rubutu ba tare da duba maballan keyboard ba.', en: 'Developing touch typing without looking at keys.' }
          },
          {
            title: { ha: 'Ayyukan Gwajin Buga Rubutu', en: 'Typing Practice Drills' },
            lessonId: 'typing_drills',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Buga jimoli don ƙara saurinki da ƙwarewa.', en: 'Interactive typing sentence exercises.' }
          }
        ]
      },
      {
        id: 'digital_safety',
        title: {
          ha: 'Tsaron Intanet (Digital Safety)',
          en: 'Digital Safety'
        },
        icon: '🛡️',
        illustrationImg: heroTechVectorImg,
        leaves: [
          {
            title: { ha: 'Mabuɗai Masu Tsaro (Strong Passwords)', en: 'Strong Passwords' },
            lessonId: 'safety_passwords',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Kirƙirar mabuɗai masu ƙarfi don tsaron asusunku.', en: 'Creating secure, unbreakable account passwords.' }
          },
          {
            title: { ha: 'Guje wa Ha\'inci (Phishing & Scams)', en: 'Avoiding Scams & Phishing' },
            lessonId: 'safety_phishing',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Gano sakonnin ƙarya da hanyoyin damfara a intanet.', en: 'Recognizing online scams and fake messages.' }
          },
          {
            title: { ha: 'Kiyaye Sirrin Bayanai', en: 'Privacy & Data Protection' },
            lessonId: 'safety_privacy',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Kiyaye lambobin waya da bayanan sirri daga baƙi.', en: 'Protecting personal data on public websites.' }
          },
          {
            title: { ha: 'Dabi\'un Tsaro a Yanar Gizo', en: 'Safe Browsing Habits' },
            lessonId: 'safety_browsing',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Tabbatar shafin da kake amfani da shi yana da SSL (HTTPS).', en: 'Verifying website SSL security before browsing.' }
          }
        ]
      }
    ]
  },
  {
    id: 'office',
    title: {
      ha: 'Ofis & Aiki (Office)',
      en: 'Office & Work'
    },
    icon: '💼',
    subBranches: [
      {
        id: 'ms_word',
        title: {
          ha: 'Microsoft Word',
          en: 'Microsoft Word'
        },
        icon: '📄',
        illustrationImg: wordImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a MS Word', en: 'Introduction to Word' },
            lessonId: 'word_introduction',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar abin da Microsoft Word yake da amfaninsa.', en: 'Understanding what Microsoft Word is and its uses.' }
          },
          {
            title: { ha: 'Shafin Fuskar Word', en: 'Word Interface' },
            lessonId: 'word_interface',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Gano sassan shafin fuskar Word da kuma aikinsu.', en: 'Identify the parts of the Word interface and their functions.' }
          },
          {
            title: { ha: 'Tsara Rubutu & Ado', en: 'Text Formatting & Styles' },
            lessonId: 'word_formatting',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Bada launi, sauya font da tsara layukan rubutu.', en: 'Changing fonts, colors, and paragraph alignment.' }
          },
          {
            title: { ha: 'Jadawali & Hotuna', en: 'Tables & Images' },
            lessonId: 'word_tables',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Shigar da jadawali (tables) da hotuna a takarda.', en: 'Inserting tables and pictures into documents.' }
          }
        ]
      },
      {
        id: 'ms_excel',
        title: {
          ha: 'Microsoft Excel',
          en: 'Microsoft Excel'
        },
        icon: '📊',
        illustrationImg: excelImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a MS Excel', en: 'Introduction to Excel' },
            lessonId: 'excel_introduction',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar abin da Excel yake da amfaninsa a aiki.', en: 'Understanding what Excel is and its uses at work.' }
          },
          {
            title: { ha: 'Shigar da Bayanai & Cell', en: 'Data Entry & Cells' },
            lessonId: 'excel_cells',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Rubuta lamba da suna a kowane kwando (cell).', en: 'Entering data and navigating spreadsheet cells.' }
          },
          {
            title: { ha: 'Lissafi da Kaidodi (Formulas)', en: 'Basic Formulas' },
            lessonId: 'excel_formulas',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Amfani da SUM, AVERAGE da COUNT wajen lissafi.', en: 'Using basic functions like SUM, AVERAGE, and COUNT.' }
          }
        ]
      },
      {
        id: 'ms_powerpoint',
        title: {
          ha: 'Microsoft PowerPoint',
          en: 'Microsoft PowerPoint'
        },
        icon: '📽️',
        illustrationImg: powerpointImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a PowerPoint', en: 'PowerPoint Basics' },
            lessonId: 'powerpoint_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Koyi tsara slides don gabatar da shawara ko darasi.', en: 'Creating presentation slides for school or business.' }
          },
          {
            title: { ha: 'Motsi & Adon Slides', en: 'Slide Design & Animations' },
            lessonId: 'powerpoint_design',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Sanya launuka da motsin hoto (animations).', en: 'Adding themes, transitions, and slide animations.' }
          }
        ]
      },
      {
        id: 'google_docs',
        title: {
          ha: 'Google Docs',
          en: 'Google Docs'
        },
        icon: '📝',
        illustrationImg: gdocsImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Google Docs', en: 'Introduction to Google Docs' },
            lessonId: 'gdocs_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Rubuta takardu a intanet tare da ajiyewa ta atomatik.', en: 'Cloud word processing with auto-saving features.' }
          },
          {
            title: { ha: 'Aiki tare da Mutane (Collaboration)', en: 'Sharing & Real-time Collaboration' },
            lessonId: 'gdocs_collaboration',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Aikawa da abokan aiki takarda su gyara a tare.', en: 'Collaborating in real time with teammates online.' }
          }
        ]
      },
      {
        id: 'google_sheets',
        title: {
          ha: 'Google Sheets',
          en: 'Google Sheets'
        },
        icon: '📈',
        illustrationImg: excelImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Google Sheets', en: 'Introduction to Google Sheets' },
            lessonId: 'gsheets_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Lissafin intanet na abokan aiki da kake kalla kai tsaye.', en: 'Online spreadsheets accessible anywhere.' }
          },
          {
            title: { ha: 'Ka\'idojin Lissafi a Sheets', en: 'Formulas & Charts in Sheets' },
            lessonId: 'gsheets_formulas',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Amfani da ka’idojin lissafi a Google Sheets.', en: 'Using formulas and functions online.' }
          }
        ]
      },
      {
        id: 'google_slides',
        title: {
          ha: 'Google Slides',
          en: 'Google Slides'
        },
        icon: '🖼️',
        illustrationImg: powerpointImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Google Slides', en: 'Introduction to Google Slides' },
            lessonId: 'gslides_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Kirƙirar gabatarwa mai kyau a gizo.', en: 'Creating online presentations and slide decks.' }
          }
        ]
      },
      {
        id: 'coreldraw',
        title: {
          ha: 'CorelDRAW',
          en: 'CorelDRAW'
        },
        icon: '🎨',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a CorelDRAW', en: 'Introduction to CorelDRAW' },
            lessonId: 'coreldraw_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Koyi fasahar zane-zane na Vector na bugu da talla.', en: 'Vector graphics design for printing and branding.' }
          },
          {
            title: { ha: 'Kayan Aikin Zane (Vector Tools)', en: 'Drawing & Shape Tools' },
            lessonId: 'coreldraw_tools',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Amfani da Pen Tool da sauran sifofi wajen zane.', en: 'Using drawing tools and combining shapes.' }
          }
        ]
      },
      {
        id: 'canva',
        title: {
          ha: 'Canva',
          en: 'Canva'
        },
        icon: '✨',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Canva', en: 'Introduction to Canva' },
            lessonId: 'canva_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Zana bannori da fastoci cikin sauki da sauri.', en: 'Quick and easy online graphic design with templates.' }
          },
          {
            title: { ha: 'Fastoci da Sakonnin Sada Zumunta', en: 'Social Media & Flyers' },
            lessonId: 'canva_design',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Tsara hotunan Facebook da Instagram cikin dakikoki.', en: 'Designing social media posts and printable flyers.' }
          }
        ]
      },
      {
        id: 'printing_doc_prep',
        title: {
          ha: 'Bugu da Shirya Takardu',
          en: 'Printing & Document Preparation'
        },
        icon: '🖨️',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Shiryawa Printer da Takarda', en: 'Printer Setup & Paper Size' },
            lessonId: 'printing_setup',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Sa saitin A4, Letter, da tazarar shafi kafin bugawa.', en: 'Configuring paper sizes, orientation, and margins.' }
          },
          {
            title: { ha: 'Ajiya a PDF da Buga Takarda', en: 'Exporting to PDF & Printing' },
            lessonId: 'printing_export',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Sauya fayil zuwa PDF don tabbatar da tsaro wajen bugu.', en: 'Converting documents to PDF for flawless printing.' }
          }
        ]
      }
    ]
  },
  {
    id: 'programming',
    title: {
      ha: 'Sifari (Programming)',
      en: 'Programming'
    },
    icon: '💻',
    subBranches: [
      {
        id: 'frontend',
        title: {
          ha: 'Gina Gaban Shafi (Frontend)',
          en: 'Frontend Development'
        },
        icon: 'Web',
        illustrationImg: programmingVectorImg,
        leaves: [
          {
            title: { ha: 'HTML Fundamentals', en: 'HTML Fundamentals' },
            lessonId: 'html_introduction',
            badge: 'Beginner',
            lessonCount: 13,
            description: { ha: 'Gida da tsarin gina yanar gizo.', en: 'The foundation and structure of web pages.' }
          },
          {
            title: { ha: 'CSS Styling', en: 'CSS Styling' },
            lessonId: 'css_introduction',
            badge: 'Beginner',
            lessonCount: 15,
            description: { ha: 'Tsara ado da kyan dandalin yanar gizo.', en: 'Styling and beautifying web interfaces.' }
          }
        ]
      },
      {
        id: 'backend',
        title: {
          ha: 'Gina Bayan Shafi (Backend)',
          en: 'Backend Development'
        },
        icon: 'Server',
        illustrationImg: heroTechVectorImg,
        leaves: [
          {
            title: { ha: 'Python Backend Basics', en: 'Python Backend Basics' },
            lessonId: 'python_introduction',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Harshen rubuta lissafi da tsarin bayanai na baya.', en: 'A versatile programming language for backend logic.' }
          }
        ]
      },
      {
        id: 'html',
        title: {
          ha: 'HTML',
          en: 'HTML'
        },
        icon: '</>',
        illustrationImg: htmlImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a HTML', en: 'Introduction to HTML' },
            lessonId: 'html_introduction',
            badge: 'Beginner',
            lessonCount: 13,
            description: { ha: 'Gida da tsarin gina yanar gizo da lakabin HTML.', en: 'The foundation and structure of web pages using HTML tags.' }
          }
        ]
      },
      {
        id: 'css',
        title: {
          ha: 'CSS',
          en: 'CSS'
        },
        icon: '{;}',
        illustrationImg: cssImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a CSS', en: 'Introduction to CSS' },
            lessonId: 'css_introduction',
            badge: 'Beginner',
            lessonCount: 15,
            description: { ha: 'Tsara ado, launi, da tsarin shafin yanar gizo.', en: 'Styling, layout, and visual presentation of web pages.' }
          }
        ]
      },
      {
        id: 'javascript',
        title: {
          ha: 'JavaScript',
          en: 'JavaScript'
        },
        icon: 'JS',
        illustrationImg: jsImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a JavaScript', en: 'Introduction to JavaScript' },
            lessonId: 'js_introduction',
            badge: 'Intermediate',
            lessonCount: 12,
            description: { ha: 'Kara motsi da inganci a shafin yanar gizo.', en: 'Adding interactivity and logic to web applications.' }
          }
        ]
      },
      {
        id: 'python',
        title: {
          ha: 'Python',
          en: 'Python'
        },
        icon: 'PY',
        illustrationImg: pythonImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Python', en: 'Introduction to Python' },
            lessonId: 'python_introduction',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Harshen rubuta lissafi da tsarin bayanai na baya.', en: 'A versatile programming language for backend logic and automation.' }
          }
        ]
      }
    ]
  },
  {
    id: 'creative',
    title: {
      ha: 'Fasahar Zane (Creative Skills)',
      en: 'Creative Skills'
    },
    icon: '🎨',
    subBranches: [
      {
        id: 'graphic_design',
        title: {
          ha: 'Zane-Zane (Graphic Design)',
          en: 'Graphic Design'
        },
        icon: '🖌️',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Graphic Design', en: 'Introduction to Graphic Design' },
            lessonId: 'graphic_design_intro',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar ka’idojin launuka, tsari, da daidaiton zane.', en: 'Fundamentals of color theory, typography, and composition.' }
          },
          {
            title: { ha: 'Ka’idojin Launuka (Color Theory)', en: 'Color Theory' },
            lessonId: 'graphic_design_color',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Zaɓar launuka masu dacewa da juna wajen zane.', en: 'Understanding color harmonies, contrast, and palettes.' }
          }
        ]
      },
      {
        id: 'coreldraw',
        title: {
          ha: 'CorelDRAW',
          en: 'CorelDRAW'
        },
        icon: '✏️',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a CorelDRAW', en: 'Introduction to CorelDRAW' },
            lessonId: 'coreldraw_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Koyi fasahar zane-zane na Vector na bugu da talla.', en: 'Vector graphics design for printing and branding.' }
          },
          {
            title: { ha: 'Kayan Aikin Zane (Vector Tools)', en: 'Drawing & Shape Tools' },
            lessonId: 'coreldraw_tools',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Amfani da Pen Tool da sauran sifofi wajen zane.', en: 'Using drawing tools and combining shapes.' }
          }
        ]
      },
      {
        id: 'canva',
        title: {
          ha: 'Canva',
          en: 'Canva'
        },
        icon: '✨',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Canva', en: 'Introduction to Canva' },
            lessonId: 'canva_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Zana bannori da fastoci cikin sauki da sauri.', en: 'Quick and easy online graphic design with templates.' }
          },
          {
            title: { ha: 'Fastoci da Sakonnin Sada Zumunta', en: 'Social Media & Flyers' },
            lessonId: 'canva_design',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Tsara hotunan Facebook da Instagram cikin dakikoki.', en: 'Designing social media posts and printable flyers.' }
          }
        ]
      },
      {
        id: 'ui_design',
        title: {
          ha: 'Tsara Fuskar Manhaja (UI Design)',
          en: 'UI Design'
        },
        icon: '📐',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a UI Design', en: 'Introduction to UI Design' },
            lessonId: 'ui_design_intro',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Koyi tsara fuskar shafukan yanar gizo da aikace-aikace.', en: 'Designing clean and attractive user interfaces.' }
          },
          {
            title: { ha: 'Tsara Maballai da Sifofi (Components)', en: 'UI Components & Layouts' },
            lessonId: 'ui_design_components',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Kirƙirar buttons, cards, da menus masu kyan gani.', en: 'Building consistent UI cards, buttons, and navigation.' }
          }
        ]
      },
      {
        id: 'ux_design',
        title: {
          ha: 'Kwarewar Mai Amfani (UX Design)',
          en: 'UX Design'
        },
        icon: '🧠',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a UX Design', en: 'Introduction to UX Design' },
            lessonId: 'ux_design_intro',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar bukatun mai amfani da sauƙaƙa amfani da manhaja.', en: 'Understanding user experience, research, and usability.' }
          },
          {
            title: { ha: 'Taswirar Mai Amfani (Wireframing & User Journey)', en: 'Wireframing & Journeys' },
            lessonId: 'ux_design_wireframes',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Tsara taswirar shafin kafin fara zane na karshe.', en: 'Sketching user flows and low-fidelity wireframes.' }
          }
        ]
      },
      {
        id: 'video_editing',
        title: {
          ha: 'Tatsar Bidiyo (Video Editing)',
          en: 'Video Editing'
        },
        icon: '🎬',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Tatsar Bidiyo', en: 'Video Editing Basics' },
            lessonId: 'video_editing_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Yanke bidiyo, haɗawa, da gine sautuka cikin sauki.', en: 'Cutting, trimming, and assembling video clips.' }
          },
          {
            title: { ha: 'Sanya Sautuka & Ado (Audio & Transitions)', en: 'Transitions & Audio' },
            lessonId: 'video_editing_transitions',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Qara kiɗa, amsamo sauti, da sauye-sauyen sauri.', en: 'Adding background music, voiceovers, and transitions.' }
          }
        ]
      },
      {
        id: 'photography',
        title: {
          ha: 'Daukar Hoto (Photography)',
          en: 'Photography'
        },
        icon: '📷',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Photography', en: 'Photography Fundamentals' },
            lessonId: 'photography_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Fahimtar Haske (Lighting), Hasada (Focus), da Composition.', en: 'Understanding camera angles, lighting, and framing.' }
          },
          {
            title: { ha: 'Gyaran Hoto (Photo Editing)', en: 'Photo Editing & Retouching' },
            lessonId: 'photography_editing',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Gyara haske da launin hoto a waya ko kwamfuta.', en: 'Adjusting exposure, contrast, and color grading.' }
          }
        ]
      },
      {
        id: 'animation',
        title: {
          ha: 'Hoto Mai Motsi (Animation)',
          en: 'Animation'
        },
        icon: '📽️',
        illustrationImg: officeVectorImg,
        leaves: [
          {
            title: { ha: 'Gabatarwa a Animation', en: 'Introduction to Animation' },
            lessonId: 'animation_basics',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Ka’idojin 12 na motsa hotuna da haruffa.', en: 'The 12 principles of 2D and motion graphic animation.' }
          },
          {
            title: { ha: 'Motsa Haruffa & Hotuna (Motion Graphics)', en: 'Motion Graphics' },
            lessonId: 'animation_motion',
            badge: 'Beginner',
            lessonCount: 1,
            description: { ha: 'Motsa lakabi da haruffa don bidiyon tallace-tallace.', en: 'Animating titles, logos, and graphic elements.' }
          }
        ]
      }
    ]
  }
];
