class QuizAnswer {
  final String id;
  final String text;

  const QuizAnswer({
    required this.id,
    required this.text,
  });

  factory QuizAnswer.fromJson(Map<String, dynamic> json) {
    return QuizAnswer(
      id: json['id'].toString(),
      text: json['answer_text'] as String,
    );
  }
}

class QuizQuestion {
  final String id;
  final String questionText;
  final List<QuizAnswer> answers;

  const QuizQuestion({
    required this.id,
    required this.questionText,
    required this.answers,
  });

  factory QuizQuestion.fromJson(Map<String, dynamic> json) {
    return QuizQuestion(
      id: json['id'].toString(),
      questionText: json['question'] as String,
      answers: (json['answers'] as List<dynamic>? ?? const [])
          .map(
            (answer) => QuizAnswer.fromJson(
              Map<String, dynamic>.from(answer as Map),
            ),
          )
          .toList(),
    );
  }
}

class Quiz {
  final String id;
  final String title;
  final int passingPercentage;
  final List<QuizQuestion> questions;

  const Quiz({
    required this.id,
    required this.title,
    required this.passingPercentage,
    required this.questions,
  });

  factory Quiz.fromJson(Map<String, dynamic> json) {
    return Quiz(
      id: json['id'].toString(),
      title: json['title'] as String,
      passingPercentage: json['passingPercentage'] as int,
      questions: (json['questions'] as List<dynamic>? ?? const [])
          .map(
            (question) => QuizQuestion.fromJson(
              Map<String, dynamic>.from(question as Map),
            ),
          )
          .toList(),
    );
  }
}
