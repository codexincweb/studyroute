require("dotenv").config();

const pool = require("./db/db");

const path = {
  goal: "Cyber Security",
  level: "Beginner",
  title: "Cyber Security Beginner Route",
  description:
    "A practical beginner route covering cybersecurity fundamentals, networking, authentication, common threats, defensive security, and safe security practices."
};

const stages = [
  {
    orderIndex: 1,
    title: "Cyber Security Fundamentals",
    description:
      "Learn the foundations of cybersecurity, security principles, threats, vulnerabilities, and risk.",
    objectives: [
      "Understand the purpose and scope of cybersecurity.",
      "Explain confidentiality, integrity, and availability.",
      "Distinguish threats, vulnerabilities, and risks.",
      "Recognize common categories of cyber attacks.",
      "Understand basic security controls and defensive practices."
    ],
    resources: [
      {
        title: "CISA: Cybersecurity Basics",
        type: "documentation",
        url: "https://www.cisa.gov/topics/cyber-threats-and-advisories"
      },
      {
        title: "NIST: Cybersecurity Framework",
        type: "documentation",
        url: "https://www.nist.gov/cyberframework"
      }
    ],
    quiz: {
      title: "Cyber Security Fundamentals Quiz",
      questions: [
        {
          question: "What does confidentiality mean in cybersecurity?",
          answers: [
            ["Ensuring information is accessible only to authorized parties", true],
            ["Ensuring every system is always online", false],
            ["Ensuring data is never backed up", false],
            ["Ensuring every user has administrator access", false]
          ]
        },
        {
          question: "What does integrity protect?",
          answers: [
            ["The accuracy and trustworthiness of information", true],
            ["Only the physical size of a hard drive", false],
            ["The number of users on a network", false],
            ["The color of an application's interface", false]
          ]
        },
        {
          question: "What is a vulnerability?",
          answers: [
            ["A weakness that could be exploited to affect a system or asset", true],
            ["A guaranteed successful attack", false],
            ["A type of antivirus software", false],
            ["A backup copy of a database", false]
          ]
        },
        {
          question: "What is cybersecurity risk generally concerned with?",
          answers: [
            ["The potential impact and likelihood associated with security threats and vulnerabilities", true],
            ["Only the purchase price of a computer", false],
            ["The number of applications installed", false],
            ["The speed of an internet connection", false]
          ]
        },
        {
          question: "Confidentiality, integrity, and availability are commonly known as the CIA triad.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 2,
    title: "Networking & Internet Security Basics",
    description:
      "Understand fundamental networking concepts and how network communication relates to security.",
    objectives: [
      "Understand IP addresses, ports, and basic network protocols.",
      "Explain the roles of TCP and UDP at a basic level.",
      "Understand DNS and HTTP/HTTPS.",
      "Recognize basic network attack concepts.",
      "Apply safe network security practices."
    ],
    resources: [
      {
        title: "Cloudflare Learning Center: Networking",
        type: "documentation",
        url: "https://www.cloudflare.com/learning/network-layer/what-is-a-computer-network/"
      },
      {
        title: "Cisco Networking Basics",
        type: "documentation",
        url: "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/networking-basics.html"
      }
    ],
    quiz: {
      title: "Networking & Internet Security Basics Quiz",
      questions: [
        {
          question: "What is an IP address used for?",
          answers: [
            ["Identifying and addressing a device or network interface for communication", true],
            ["Encrypting every file on a computer", false],
            ["Creating user passwords automatically", false],
            ["Replacing an operating system", false]
          ]
        },
        {
          question: "What is the purpose of a network port?",
          answers: [
            ["It identifies a logical endpoint associated with network services or processes", true],
            ["It stores website images permanently", false],
            ["It replaces an IP address completely", false],
            ["It physically connects every computer to electricity", false]
          ]
        },
        {
          question: "What does HTTPS provide compared with HTTP?",
          answers: [
            ["Encrypted communication using TLS between the client and server", true],
            ["Guaranteed protection against every cyber attack", false],
            ["Unlimited internet speed", false],
            ["Automatic removal of malware from a device", false]
          ]
        },
        {
          question: "What is DNS primarily used for?",
          answers: [
            ["Translating domain names into IP addresses and other DNS records", true],
            ["Encrypting passwords inside applications", false],
            ["Scanning every computer for viruses", false],
            ["Creating physical network cables", false]
          ]
        },
        {
          question: "HTTPS encryption by itself guarantees that a website is completely trustworthy.",
          answers: [
            ["True", false],
            ["False", true]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 3,
    title: "Authentication, Passwords & Access Control",
    description:
      "Learn how identity, passwords, authentication, authorization, and access control protect systems.",
    objectives: [
      "Understand authentication and authorization.",
      "Learn secure password practices.",
      "Understand password hashing at a basic level.",
      "Recognize the purpose of multi-factor authentication.",
      "Understand the principle of least privilege."
    ],
    resources: [
      {
        title: "OWASP: Authentication Cheat Sheet",
        type: "documentation",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
      },
      {
        title: "NIST: Digital Identity Guidelines",
        type: "documentation",
        url: "https://pages.nist.gov/800-63-4/"
      }
    ],
    quiz: {
      title: "Authentication & Access Control Quiz",
      questions: [
        {
          question: "What is authentication?",
          answers: [
            ["Verifying the identity of a user, device, or system", true],
            ["Determining what every authenticated user can access", false],
            ["Encrypting all network traffic automatically", false],
            ["Backing up a database", false]
          ]
        },
        {
          question: "What is authorization?",
          answers: [
            ["Determining what an authenticated identity is allowed to access or perform", true],
            ["Verifying a password before login", false],
            ["Creating a new IP address", false],
            ["Installing antivirus software", false]
          ]
        },
        {
          question: "Why are passwords normally stored as hashes rather than plaintext?",
          answers: [
            ["A properly designed password-hashing system reduces the risk of exposing the original passwords if the database is compromised", true],
            ["Hashes allow administrators to read every password easily", false],
            ["Hashes make passwords unnecessary", false],
            ["Hashes guarantee that accounts can never be compromised", false]
          ]
        },
        {
          question: "What does multi-factor authentication add?",
          answers: [
            ["Additional authentication factors beyond a single password", true],
            ["A second copy of the same password only", false],
            ["Unlimited administrator privileges", false],
            ["A replacement for all authorization controls", false]
          ]
        },
        {
          question: "The principle of least privilege means giving users only the access they need for their tasks.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 4,
    title: "Common Cyber Threats & Social Engineering",
    description:
      "Identify common attacks and social-engineering techniques and learn how to recognize suspicious activity.",
    objectives: [
      "Recognize phishing and common social-engineering techniques.",
      "Understand malware and ransomware at a basic level.",
      "Identify common indicators of suspicious messages and websites.",
      "Understand credential theft and account compromise.",
      "Apply safe responses to suspicious security events."
    ],
    resources: [
      {
        title: "CISA: Recognize and Report Phishing",
        type: "documentation",
        url: "https://www.cisa.gov/topics/cyber-threats-and-advisories/phishing"
      },
      {
        title: "OWASP: Threat Modeling",
        type: "documentation",
        url: "https://owasp.org/www-community/Threat_Modeling"
      }
    ],
    quiz: {
      title: "Cyber Threats & Social Engineering Quiz",
      questions: [
        {
          question: "What is phishing?",
          answers: [
            ["A deceptive attempt to trick people into revealing information or taking harmful actions", true],
            ["A method of physically repairing a computer", false],
            ["A legitimate operating-system update process", false],
            ["A database optimization technique", false]
          ]
        },
        {
          question: "Which can be a warning sign of a phishing message?",
          answers: [
            ["Unexpected requests for sensitive information combined with suspicious links or urgent pressure", true],
            ["A normal message from a known contact with no unusual request", false],
            ["A locally stored document with no external communication", false],
            ["A routine offline backup", false]
          ]
        },
        {
          question: "What is ransomware?",
          answers: [
            ["Malware that can restrict access to data or systems and demand payment", true],
            ["A password manager", false],
            ["A network monitoring dashboard", false],
            ["A secure encryption standard used only for backups", false]
          ]
        },
        {
          question: "Why does social engineering target people?",
          answers: [
            ["Attackers can exploit trust, emotions, or human behavior to achieve security objectives", true],
            ["People are always easier to hack than computers", false],
            ["Social engineering requires no communication", false],
            ["Social engineering is only a physical security technique", false]
          ]
        },
        {
          question: "A suspicious message should be verified through a trusted channel before sensitive information is provided.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 5,
    title: "Defensive Security & Safe Practice",
    description:
      "Learn practical defensive habits including updates, backups, endpoint protection, monitoring, and incident response.",
    objectives: [
      "Understand the importance of security updates and patching.",
      "Use backups as part of recovery planning.",
      "Understand basic endpoint and network security controls.",
      "Recognize the purpose of logging and monitoring.",
      "Follow basic steps for responding to security incidents."
    ],
    resources: [
      {
        title: "CISA: Cybersecurity Performance Goals",
        type: "documentation",
        url: "https://www.cisa.gov/cybersecurity-performance-goals-cpgs"
      },
      {
        title: "NIST: Computer Security Resource Center",
        type: "documentation",
        url: "https://csrc.nist.gov/"
      }
    ],
    quiz: {
      title: "Defensive Security & Safe Practice Quiz",
      questions: [
        {
          question: "Why are security updates important?",
          answers: [
            ["They can fix known vulnerabilities and improve the security of software", true],
            ["They guarantee that software can never be attacked", false],
            ["They remove the need for passwords", false],
            ["They automatically recover every deleted file", false]
          ]
        },
        {
          question: "Why are backups important for security?",
          answers: [
            ["They can help recover data after incidents such as ransomware or accidental deletion", true],
            ["They prevent every attack from occurring", false],
            ["They replace authentication", false],
            ["They make encryption unnecessary", false]
          ]
        },
        {
          question: "What is the purpose of security logging?",
          answers: [
            ["Recording relevant events that can help with monitoring, investigation, and troubleshooting", true],
            ["Automatically blocking every cyber attack", false],
            ["Replacing all security controls", false],
            ["Increasing monitor brightness", false]
          ]
        },
        {
          question: "What should an organization generally do when a security incident is suspected?",
          answers: [
            ["Follow an established incident-response process to contain, investigate, and recover", true],
            ["Delete all logs immediately", false],
            ["Share sensitive credentials publicly", false],
            ["Ignore the incident until systems fail", false]
          ]
        },
        {
          question: "Keeping software updated is one part of maintaining a safer computing environment.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  }
];

async function seed() {
  try {
    let pathResult = await pool.query(
      `SELECT id FROM learning_paths
       WHERE goal = $1 AND level = $2
       LIMIT 1`,
      [path.goal, path.level]
    );

    let pathId;

    if (pathResult.rows.length > 0) {
      pathId = pathResult.rows[0].id;

      await pool.query(
        `UPDATE learning_paths
         SET title = $1, description = $2
         WHERE id = $3`,
        [path.title, path.description, pathId]
      );
    } else {
      const result = await pool.query(
        `INSERT INTO learning_paths (goal, level, title, description)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [path.goal, path.level, path.title, path.description]
      );

      pathId = result.rows[0].id;
    }

    for (const stage of stages) {
      const stageResult = await pool.query(
        `INSERT INTO stages (learning_path_id, order_index, title, description)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (learning_path_id, order_index)
         DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description
         RETURNING id`,
        [pathId, stage.orderIndex, stage.title, stage.description]
      );

      const stageId = stageResult.rows[0].id;

      await pool.query(
        `DELETE FROM stage_objectives WHERE stage_id = $1`,
        [stageId]
      );

      for (const objective of stage.objectives) {
        await pool.query(
          `INSERT INTO stage_objectives (stage_id, objective)
           VALUES ($1, $2)`,
          [stageId, objective]
        );
      }

      await pool.query(
        `DELETE FROM resources WHERE stage_id = $1`,
        [stageId]
      );

      for (const resource of stage.resources) {
        await pool.query(
          `INSERT INTO resources (stage_id, title, type, url)
           VALUES ($1, $2, $3, $4)`,
          [stageId, resource.title, resource.type, resource.url]
        );
      }

      let quizResult = await pool.query(
        `SELECT id FROM quizzes WHERE stage_id = $1 LIMIT 1`,
        [stageId]
      );

      let quizId;

      if (quizResult.rows.length > 0) {
        quizId = quizResult.rows[0].id;

        await pool.query(
          `UPDATE quizzes
           SET title = $1, passing_percentage = 70
           WHERE id = $2`,
          [stage.quiz.title, quizId]
        );

        await pool.query(
          `DELETE FROM answers
           WHERE question_id IN (
             SELECT id FROM questions WHERE quiz_id = $1
           )`,
          [quizId]
        );

        await pool.query(
          `DELETE FROM questions WHERE quiz_id = $1`,
          [quizId]
        );
      } else {
        const newQuiz = await pool.query(
          `INSERT INTO quizzes (stage_id, title, passing_percentage)
           VALUES ($1, $2, 70)
           RETURNING id`,
          [stageId, stage.quiz.title]
        );

        quizId = newQuiz.rows[0].id;
      }

      for (const question of stage.quiz.questions) {
        const questionResult = await pool.query(
          `INSERT INTO questions (quiz_id, question_text)
           VALUES ($1, $2)
           RETURNING id`,
          [quizId, question.question]
        );

        const questionId = questionResult.rows[0].id;

        for (const answer of question.answers) {
          await pool.query(
            `INSERT INTO answers (question_id, answer_text, is_correct)
             VALUES ($1, $2, $3)`,
            [questionId, answer[0], answer[1]]
          );
        }
      }

      console.log(
        `Seeded stage ${stage.orderIndex}: ${stage.title} (ID ${stageId})`
      );
    }

    console.log(`Cyber Security Beginner path ready (ID ${pathId})`);
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
