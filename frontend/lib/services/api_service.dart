import 'dart:convert';

import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'https://studyroute-one.vercel.app/api';

  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'name': name,
        'email': email,
        'password': password,
      }),
    );

    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> getLearningPaths() async {
    final response = await http.get(
      Uri.parse('$baseUrl/learning-paths'),
    );

    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> getLearningPath(
    String id,
    String token,
  ) async {
    final response = await http.get(
      Uri.parse('$baseUrl/learning-paths/$id'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    final data = _handleResponse(response);

    return Map<String, dynamic>.from(
      data['learningPath'] as Map,
    );
  }

  Future<Map<String, dynamic>> getQuiz(
    String quizId,
    String token,
  ) async {
    final response = await http.get(
      Uri.parse('$baseUrl/quizzes/$quizId'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> submitQuiz(
    String quizId,
    String token,
    List<Map<String, dynamic>> answers,
  ) async {
    final response = await http.post(
      Uri.parse('$baseUrl/quizzes/$quizId/submit'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode({
        'answers': answers,
      }),
    );

    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> getMe(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/auth/me'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> completeStage(
    String stageId,
    String token,
  ) async {
    final response = await http.post(
      Uri.parse('$baseUrl/stages/$stageId/complete'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    return _handleResponse(response);
  }

  Map<String, dynamic> _handleResponse(http.Response response) {
    final data = jsonDecode(response.body) as Map<String, dynamic>;

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return data;
    }

    final error = data['error'];

    if (error is Map<String, dynamic>) {
      throw Exception(error['message'] ?? 'Request failed');
    }

    throw Exception('Request failed');
  }
}
