require("dotenv").config();

const pool = require("./db/db");

const path = {
  goal: "Cyber Security",
  level: "Intermediate",
  title: "Cyber Security Intermediate Route",
  description:
    "An intermediate cybersecurity route covering network security, web application security, security testing, incident response, and defensive security operations."
};

const stages = [
  {
    orderIndex: 1,
    title: "Network Security & Traffic Analysis",
    description:
      "Understand network security architecture, traffic inspection, segmentation, and common network-based threats.",
    objectives: [
      "Understand network segmentation and security zones.",
      "Analyze basic network traffic and connection information.",
      "Understand firewalls, IDS, and IPS at an intermediate level.",
      "Recognize common network attack patterns.",
      "Apply defensive principles to network infrastructure."
    ],
    resources: [
      {
        title: "NIST: Network Security",
        type: "documentation",
        url: "https://csrc.nist.gov/topics/network-security"
      },
      {
        title: "OWASP: Network Security",
        type: "documentation",
        url: "https://owasp.org/www-community/attacks/"
      }
    ],
    quiz: {
      title: "Network Security & Traffic Analysis Quiz",
      questions: [
        {
          question: "What is network segmentation?",
          answers: [
            ["Dividing a network into separate zones to control communication and reduce exposure", true],
            ["Increasing the size of every network packet", false],
            ["Removing all authentication from a network", false],
            ["Replacing IP addresses with usernames", false]
          ]
        },
        {
          question: "What is the primary purpose of a firewall?",
          answers: [
            ["Controlling network traffic according to defined security rules", true],
            ["Automatically repairing compromised computers", false],
            ["Replacing all endpoint security software", false],
            ["Creating application passwords", false]
          ]
        },
        {
          question: "What does an IDS primarily do?",
          answers: [
            ["Monitors activity for signs of suspicious or malicious behavior", true],
            ["Automatically encrypts every database", false],
            ["Creates user accounts", false],
            ["Replaces network routing", false]
          ]
        },
        {
          question: "Why can network traffic analysis help defenders?",
          answers: [
            ["It can reveal unusual connections, patterns, and potential security events", true],
            ["It guarantees that no attack can occur", false],
            ["It eliminates the need for authentication", false],
            ["It automatically removes all malware", false]
          ]
        },
        {
          question: "Network segmentation can limit the impact of a compromise by restricting unnecessary communication between systems.",
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
    title: "Web Application Security",
    description:
      "Learn common web application vulnerabilities and the defensive principles used to prevent them.",
    objectives: [
      "Understand common web application security risks.",
      "Explain injection vulnerabilities at a conceptual level.",
      "Understand cross-site scripting and authentication risks.",
      "Apply secure input validation principles.",
      "Use OWASP guidance when reviewing web applications."
    ],
    resources: [
      {
        title: "OWASP Top 10",
        type: "documentation",
        url: "https://owasp.org/www-project-top-ten/"
      },
      {
        title: "OWASP Web Security Testing Guide",
        type: "documentation",
        url: "https://owasp.org/www-project-web-security-testing-guide/"
      }
    ],
    quiz: {
      title: "Web Application Security Quiz",
      questions: [
        {
          question: "What is an injection vulnerability?",
          answers: [
            ["A vulnerability where untrusted input is interpreted as part of a command or query", true],
            ["A problem caused only by slow internet connections", false],
            ["A type of password manager", false],
            ["A method for compressing images", false]
          ]
        },
        {
          question: "What is cross-site scripting (XSS)?",
          answers: [
            ["A vulnerability involving the execution of attacker-controlled script in a user's browser context", true],
            ["A method for physically securing servers", false],
            ["A database backup technique", false],
            ["A network cable standard", false]
          ]
        },
        {
          question: "Why is input validation important?",
          answers: [
            ["It helps ensure incoming data meets expected requirements and reduces unsafe input handling", true],
            ["It guarantees that an application has no vulnerabilities", false],
            ["It replaces authentication completely", false],
            ["It automatically encrypts every network connection", false]
          ]
        },
        {
          question: "Why should developers use parameterized queries?",
          answers: [
            ["They help prevent untrusted input from being interpreted as SQL code", true],
            ["They make passwords unnecessary", false],
            ["They prevent all types of malware", false],
            ["They replace HTTPS", false]
          ]
        },
        {
          question: "OWASP provides widely used guidance for identifying and reducing web application security risks.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 3,
    title: "Security Testing & Ethical Hacking",
    description:
      "Learn the foundations of authorized security testing, vulnerability assessment, reconnaissance, and responsible reporting.",
    objectives: [
      "Understand the difference between vulnerability assessment and penetration testing.",
      "Understand passive and active reconnaissance.",
      "Identify common stages of an authorized security assessment.",
      "Document security findings with evidence and impact.",
      "Follow authorization and responsible disclosure principles."
    ],
    resources: [
      {
        title: "NIST: Technical Guide to Information Security Testing",
        type: "documentation",
        url: "https://csrc.nist.gov/publications/detail/sp/800-115/final"
      },
      {
        title: "OWASP Web Security Testing Guide",
        type: "documentation",
        url: "https://owasp.org/www-project-web-security-testing-guide/"
      }
    ],
    quiz: {
      title: "Security Testing & Ethical Hacking Quiz",
      questions: [
        {
          question: "What distinguishes authorized penetration testing from unauthorized hacking?",
          answers: [
            ["Penetration testing is performed with explicit permission and defined scope", true],
            ["Penetration testing never involves security risks", false],
            ["Unauthorized hacking is acceptable when no data is changed", false],
            ["Penetration testing requires no documentation", false]
          ]
        },
        {
          question: "What is reconnaissance?",
          answers: [
            ["Collecting information about a target to understand its attack surface", true],
            ["Deleting all security logs", false],
            ["Encrypting every user password", false],
            ["Replacing a firewall with a router", false]
          ]
        },
        {
          question: "Why is scope important during a security assessment?",
          answers: [
            ["It defines what systems and activities are authorized for testing", true],
            ["It guarantees that every vulnerability will be found", false],
            ["It eliminates the need for permission", false],
            ["It determines the physical size of the target network", false]
          ]
        },
        {
          question: "What makes a security finding useful to a client?",
          answers: [
            ["Clear evidence, affected assets, impact, and practical remediation guidance", true],
            ["Only a screenshot without context", false],
            ["An unsupported claim that the system is insecure", false],
            ["A list of unrelated vulnerabilities", false]
          ]
        },
        {
          question: "Security testing should be performed only on systems for which the tester has appropriate authorization.",
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
    title: "Incident Response & Digital Forensics Basics",
    description:
      "Learn how security teams detect, contain, investigate, and recover from cybersecurity incidents.",
    objectives: [
      "Understand the main stages of incident response.",
      "Identify useful evidence during security investigations.",
      "Understand basic containment and eradication concepts.",
      "Recognize the importance of preserving logs and evidence.",
      "Document incidents clearly for recovery and lessons learned."
    ],
    resources: [
      {
        title: "NIST: Computer Security Incident Handling Guide",
        type: "documentation",
        url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final"
      },
      {
        title: "CISA: Incident Response",
        type: "documentation",
        url: "https://www.cisa.gov/topics/cyber-threats-and-advisories"
      }
    ],
    quiz: {
      title: "Incident Response & Digital Forensics Quiz",
      questions: [
        {
          question: "What is incident response?",
          answers: [
            ["A structured process for detecting, containing, investigating, and recovering from security incidents", true],
            ["A process for designing website colors", false],
            ["A method for increasing processor speed", false],
            ["A replacement for all security controls", false]
          ]
        },
        {
          question: "Why is containment important during an incident?",
          answers: [
            ["It helps limit the spread or impact of the incident", true],
            ["It guarantees the attacker can never return", false],
            ["It deletes all evidence automatically", false],
            ["It replaces the need for investigation", false]
          ]
        },
        {
          question: "Why should security logs be preserved during an investigation?",
          answers: [
            ["They may provide evidence about events, timelines, and affected systems", true],
            ["Logs automatically identify every attacker", false],
            ["Logs prevent all future attacks", false],
            ["Logs are only useful for improving interface design", false]
          ]
        },
        {
          question: "What is an important purpose of lessons learned after an incident?",
          answers: [
            ["Identifying improvements that can reduce the likelihood or impact of future incidents", true],
            ["Deleting all incident documentation", false],
            ["Avoiding security updates", false],
            ["Removing all monitoring controls", false]
          ]
        },
        {
          question: "Incident documentation can help organizations understand what happened and improve future response.",
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
    title: "Security Operations & Defense",
    description:
      "Build an understanding of security monitoring, vulnerability management, endpoint defense, and practical security operations.",
    objectives: [
      "Understand the role of a security operations function.",
      "Interpret basic security alerts and logs.",
      "Understand vulnerability management workflows.",
      "Recognize endpoint detection and response concepts.",
      "Apply defense-in-depth principles."
    ],
    resources: [
      {
        title: "NIST: Cybersecurity Framework",
        type: "documentation",
        url: "https://www.nist.gov/cyberframework"
      },
      {
        title: "CISA: Cybersecurity Performance Goals",
        type: "documentation",
        url: "https://www.cisa.gov/cybersecurity-performance-goals-cpgs"
      }
    ],
    quiz: {
      title: "Security Operations & Defense Quiz",
      questions: [
        {
          question: "What is the purpose of security monitoring?",
          answers: [
            ["Detecting and investigating suspicious or abnormal activity", true],
            ["Replacing every security policy", false],
            ["Making every system publicly accessible", false],
            ["Removing the need for software updates", false]
          ]
        },
        {
          question: "What is vulnerability management?",
          answers: [
            ["A process of identifying, assessing, prioritizing, and addressing security vulnerabilities", true],
            ["A process of designing application logos", false],
            ["A method of creating social media accounts", false],
            ["A replacement for incident response", false]
          ]
        },
        {
          question: "What does defense in depth mean?",
          answers: [
            ["Using multiple complementary security controls so one failure does not expose everything", true],
            ["Using only one strong password", false],
            ["Removing all network segmentation", false],
            ["Relying entirely on antivirus software", false]
          ]
        },
        {
          question: "Why is alert prioritization important in security operations?",
          answers: [
            ["It helps analysts focus attention on events with greater potential security impact", true],
            ["It guarantees that every alert is a real attack", false],
            ["It removes the need for investigation", false],
            ["It automatically fixes every vulnerability", false]
          ]
        },
        {
          question: "Effective security operations combine technology, processes, and human analysis.",
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

    console.log(`Cyber Security Intermediate path ready (ID ${pathId})`);
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
