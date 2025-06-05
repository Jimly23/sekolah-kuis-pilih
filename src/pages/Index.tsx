import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, GraduationCap, Building, BookOpen, User, Mail, Calendar, Info, Target, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StudentInfo {
  name: string;
  email: string;
  age: string;
  currentSchool: string;
}

interface QuizAnswer {
  questionId: number;
  answer: 'ya' | 'tidak';
  category: 'SMK' | 'SMA' | 'MA';
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'registration' | 'quiz' | 'results'>('landing');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    email: '',
    age: '',
    currentSchool: ''
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const questions = [
    // SMK Questions (10)
    { id: 1, category: 'SMK', text: 'Apakah kamu lebih suka belajar dengan praktek langsung daripada teori?' },
    { id: 2, category: 'SMK', text: 'Apakah kamu tertarik untuk memiliki keterampilan teknis yang bisa langsung digunakan untuk bekerja?' },
    { id: 3, category: 'SMK', text: 'Apakah kamu senang bekerja dengan tangan dan membuat sesuatu?' },
    { id: 4, category: 'SMK', text: 'Apakah kamu ingin langsung bekerja setelah lulus SMA?' },
    { id: 5, category: 'SMK', text: 'Apakah kamu tertarik dengan bidang teknologi, otomotif, atau tata boga?' },
    { id: 6, category: 'SMK', text: 'Apakah kamu lebih suka pembelajaran yang fokus pada keterampilan khusus?' },
    { id: 7, category: 'SMK', text: 'Apakah kamu senang dengan kegiatan yang melibatkan alat-alat praktis?' },
    { id: 8, category: 'SMK', text: 'Apakah kamu ingin memiliki sertifikat keahlian tertentu?' },
    { id: 9, category: 'SMK', text: 'Apakah kamu tertarik untuk magang di industri?' },
    { id: 10, category: 'SMK', text: 'Apakah kamu lebih suka belajar hal-hal yang bisa langsung diterapkan?' },
    
    // SMA Questions (10)
    { id: 11, category: 'SMA', text: 'Apakah kamu berencana melanjutkan ke perguruan tinggi?' },
    { id: 12, category: 'SMA', text: 'Apakah kamu senang dengan mata pelajaran seperti matematika, fisika, atau kimia?' },
    { id: 13, category: 'SMA', text: 'Apakah kamu tertarik untuk mempelajari berbagai bidang ilmu secara umum?' },
    { id: 14, category: 'SMA', text: 'Apakah kamu suka dengan pembelajaran yang lebih teoritis dan konseptual?' },
    { id: 15, category: 'SMA', text: 'Apakah kamu ingin memiliki waktu lebih lama untuk menentukan jurusan di masa depan?' },
    { id: 16, category: 'SMA', text: 'Apakah kamu tertarik dengan kegiatan ekstrakurikuler yang beragam?' },
    { id: 17, category: 'SMA', text: 'Apakah kamu senang dengan diskusi dan analisis mendalam?' },
    { id: 18, category: 'SMA', text: 'Apakah kamu ingin mempersiapkan diri untuk ujian masuk universitas?' },
    { id: 19, category: 'SMA', text: 'Apakah kamu tertarik dengan penelitian dan eksperimen?' },
    { id: 20, category: 'SMA', text: 'Apakah kamu senang dengan pembelajaran yang fleksibel dan luas?' },
    
    // MA Questions (10)
    { id: 21, category: 'MA', text: 'Apakah kamu ingin memperdalam pengetahuan agama Islam?' },
    { id: 22, category: 'MA', text: 'Apakah kamu senang mempelajari Al-Quran dan Hadits?' },
    { id: 23, category: 'MA', text: 'Apakah kamu tertarik dengan sejarah dan kebudayaan Islam?' },
    { id: 24, category: 'MA', text: 'Apakah kamu ingin mengombinasikan pendidikan umum dengan pendidikan agama?' },
    { id: 25, category: 'MA', text: 'Apakah kamu tertarik untuk melanjutkan ke perguruan tinggi Islam?' },
    { id: 26, category: 'MA', text: 'Apakah kamu senang dengan pembelajaran bahasa Arab?' },
    { id: 27, category: 'MA', text: 'Apakah kamu ingin menjadi bagian dari komunitas yang religius?' },
    { id: 28, category: 'MA', text: 'Apakah kamu tertarik dengan kajian fiqih dan akhlak?' },
    { id: 29, category: 'MA', text: 'Apakah kamu ingin mengembangkan karakter Islami?' },
    { id: 30, category: 'MA', text: 'Apakah kamu tertarik dengan dakwah dan pendidikan Islam?' }
  ];

  const handleRegistration = () => {
    if (!studentInfo.name || !studentInfo.email || !studentInfo.age || !studentInfo.currentSchool) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua data diri sebelum melanjutkan",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('quiz');
  };

  const handleAnswer = (answer: 'ya' | 'tidak') => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer,
      category: currentQuestion.category as 'SMK' | 'SMA' | 'MA'
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults(updatedAnswers);
    }
  };

  const calculateResults = (allAnswers: QuizAnswer[]) => {
    const scores = {
      SMK: allAnswers.filter(a => a.category === 'SMK' && a.answer === 'ya').length,
      SMA: allAnswers.filter(a => a.category === 'SMA' && a.answer === 'ya').length,
      MA: allAnswers.filter(a => a.category === 'MA' && a.answer === 'ya').length
    };

    const recommendation = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0];
    
    toast({
      title: "Quiz Selesai!",
      description: `Rekomendasi untuk kamu: ${recommendation}`,
    });

    setCurrentStep('results');
  };

  const getRecommendationDetails = () => {
    const scores = {
      SMK: answers.filter(a => a.category === 'SMK' && a.answer === 'ya').length,
      SMA: answers.filter(a => a.category === 'SMA' && a.answer === 'ya').length,
      MA: answers.filter(a => a.category === 'MA' && a.answer === 'ya').length
    };

    const recommendation = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0];

    const details = {
      SMK: {
        title: 'SMK (Sekolah Menengah Kejuruan)',
        description: 'Berdasarkan jawaban kamu, SMK adalah pilihan yang tepat karena kamu cenderung menyukai pembelajaran praktis dan ingin memiliki keterampilan teknis yang siap pakai. SMK akan mempersiapkan kamu untuk langsung terjun ke dunia kerja dengan keahlian spesifik.',
        advantages: [
          'Pembelajaran fokus pada praktik dan keterampilan',
          'Siap kerja setelah lulus',
          'Memiliki sertifikat keahlian',
          'Kesempatan magang di industri'
        ]
      },
      SMA: {
        title: 'SMA (Sekolah Menengah Atas)',
        description: 'Hasil quiz menunjukkan bahwa kamu cocok untuk SMA karena tertarik dengan pembelajaran yang luas dan berencana melanjutkan ke perguruan tinggi. SMA memberikan fondasi akademik yang kuat untuk berbagai bidang studi.',
        advantages: [
          'Persiapan yang baik untuk perguruan tinggi',
          'Pembelajaran yang komprehensif',
          'Fleksibilitas dalam memilih jurusan',
          'Pengembangan kemampuan analitis'
        ]
      },
      MA: {
        title: 'MA (Madrasah Aliyah)',
        description: 'Kamu sangat cocok untuk MA karena memiliki minat yang tinggi terhadap pendidikan agama Islam. MA menggabungkan pendidikan umum dengan pendidikan agama, ideal untuk mengembangkan karakter Islami.',
        advantages: [
          'Penguatan pendidikan agama Islam',
          'Kombinasi ilmu umum dan agama',
          'Pengembangan karakter Islami',
          'Persiapan untuk perguruan tinggi Islam'
        ]
      }
    };

    return { recommendation, details: details[recommendation], scores };
  };

  const resetQuiz = () => {
    setCurrentStep('landing');
    setStudentInfo({ name: '', email: '', age: '', currentSchool: '' });
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <GraduationCap className="w-20 h-20 mx-auto mb-6 text-white opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                LAYANAN <br />
                PENEMPATAN DAN <br />
                PENYALURAN <br />
                LULUS SMP
              </h1>
              <p className="text-xl md:text-2xl text-green-50 mb-8 font-light">
                Temukan jenjang pendidikan yang tepat untuk masa depanmu
              </p>
            </div>
            
            <Button 
              onClick={() => setCurrentStep('registration')} 
              size="lg" 
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Mulai Quiz Sekarang
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Detailed explanation section */}
          <Card className="mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-blue-700">Mengapa Pemilihan Jalur Pendidikan Penting?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Masa Sekolah Menengah Pertama (SMP) merupakan periode transisi penting dalam kehidupan remaja. 
                  Peralihan dari jenjang SMP ke jenjang pendidikan selanjutnya merupakan tahapan krusial dalam kehidupan siswa. 
                  Keputusan pemilihan sekolah menengah atas (SMA) atau sekolah menengah kejuruan (SMK), serta jalur pendidikan 
                  alternatif lainnya, mempengaruhi masa depan akademik dan karier mereka.
                </p>
                
                <p>
                  Sayangnya, siswa SMP seringkali menghadapi berbagai tantangan dalam proses pengambilan keputusan ini. 
                  Kurangnya informasi yang komprehensif dan mudah diakses tentang berbagai pilihan pendidikan, persyaratan 
                  pendaftaran, dan peluang karier yang tersedia menjadi kendala utama. Banyak siswa dan orang tua merasa 
                  kebingungan dalam memilih jalur pendidikan yang sesuai dengan minat, bakat, dan kemampuan siswa. Akibatnya, 
                  terdapat risiko siswa memilih jalur pendidikan yang tidak sesuai, berdampak pada prestasi akademik dan 
                  kepuasan belajar mereka.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-center mb-3">
                    <Info className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-800">Memberikan Informasi yang Komprehensif</h3>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Menyediakan informasi yang mudah diakses tentang berbagai pilihan pendidikan
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                  <div className="flex items-center mb-3">
                    <Users className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">Memberikan Bimbingan Karir</h3>
                  </div>
                  <p className="text-green-700 text-sm">
                    Memberikan panduan untuk membantu siswa dalam mengeksplorasi minat dan bakat mereka, 
                    serta merencanakan karir di masa depan
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
                  <div className="flex items-center mb-3">
                    <Target className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-purple-800">Meningkatkan Kesesuaian Pilihan</h3>
                  </div>
                  <p className="text-purple-700 text-sm">
                    Membantu siswa dalam memilih jalur pendidikan yang sesuai dengan minat dan kemampuan mereka, 
                    sehingga meningkatkan peluang keberhasilan dan kepuasan belajar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ... keep existing code (Quiz info card) */}
          <Card className="mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-blue-700">Apa itu Quiz Kompatibilitas Pendidikan?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Quiz ini dirancang khusus untuk membantu siswa SMP menentukan pilihan sekolah menengah atas yang paling sesuai 
                dengan minat, bakat, dan tujuan masa depan mereka. Melalui 30 pertanyaan yang telah dirancang secara khusus, 
                quiz ini akan menganalisis kecenderungan kamu terhadap tiga jenis sekolah:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Building className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-800">SMK</h3>
                    <p className="text-sm text-blue-600">Fokus keterampilan teknis</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">SMA</h3>
                    <p className="text-sm text-green-600">Persiapan perguruan tinggi</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-purple-800">MA</h3>
                    <p className="text-sm text-purple-600">Pendidikan umum + agama</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <h4 className="font-semibold text-yellow-800 mb-2">Manfaat Quiz Ini:</h4>
                <ul className="list-disc list-inside text-yellow-700 space-y-1">
                  <li>Membantu mengenali minat dan bakat diri</li>
                  <li>Memberikan rekomendasi berdasarkan analisis ilmiah</li>
                  <li>Menghemat waktu dalam memilih sekolah yang tepat</li>
                  <li>Mengurangi risiko salah pilih jurusan</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'registration') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-blue-700">Data Diri Siswa</CardTitle>
            <p className="text-center text-gray-600">Lengkapi data diri kamu sebelum memulai quiz</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nama Lengkap
              </Label>
              <Input
                id="name"
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={studentInfo.email}
                onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
                placeholder="contoh@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Umur
              </Label>
              <Input
                id="age"
                value={studentInfo.age}
                onChange={(e) => setStudentInfo({...studentInfo, age: e.target.value})}
                placeholder="Masukkan umur"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Sekolah Saat Ini
              </Label>
              <Input
                id="school"
                value={studentInfo.currentSchool}
                onChange={(e) => setStudentInfo({...studentInfo, currentSchool: e.target.value})}
                placeholder="Nama SMP/MTs"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('landing')}
                className="flex-1"
              >
                Kembali
              </Button>
              <Button 
                onClick={handleRegistration}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Mulai Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
              </span>
              <span className="text-sm text-gray-600 font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {currentQuestion.category === 'SMK' && <Building className="w-5 h-5 text-blue-600" />}
                {currentQuestion.category === 'SMA' && <GraduationCap className="w-5 h-5 text-green-600" />}
                {currentQuestion.category === 'MA' && <BookOpen className="w-5 h-5 text-purple-600" />}
                <span className="text-sm font-medium text-gray-500">
                  Kategori: {currentQuestion.category}
                </span>
              </div>
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleAnswer('ya')}
                  className="flex-1 h-12 text-lg bg-green-600 hover:bg-green-700"
                >
                  Ya
                </Button>
                <Button
                  onClick={() => handleAnswer('tidak')}
                  variant="outline"
                  className="flex-1 h-12 text-lg border-red-300 text-red-600 hover:bg-red-50"
                >
                  Tidak
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Jawab dengan jujur sesuai dengan minat dan preferensi kamu
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    const { recommendation, details, scores } = getRecommendationDetails();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Hasil Quiz Kompatibilitas</h1>
            <p className="text-lg text-gray-600">Halo {studentInfo.name}, ini adalah rekomendasi untuk kamu!</p>
          </div>

          <Card className="mb-6 animate-scale-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-700">{details.title}</CardTitle>
              <div className="flex justify-center mt-4">
                {recommendation === 'SMK' && <Building className="w-12 h-12 text-blue-600" />}
                {recommendation === 'SMA' && <GraduationCap className="w-12 h-12 text-green-600" />}
                {recommendation === 'MA' && <BookOpen className="w-12 h-12 text-purple-600" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-800">Mengapa {recommendation} cocok untuk kamu?</h3>
                <p className="text-gray-700 leading-relaxed">{details.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-800">Keunggulan {recommendation}:</h3>
                <ul className="space-y-2">
                  {details.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-gray-800">Skor Detail:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      SMK
                    </span>
                    <span className="font-medium">{scores.SMK}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-green-600" />
                      SMA
                    </span>
                    <span className="font-medium">{scores.SMA}/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      MA
                    </span>
                    <span className="font-medium">{scores.MA}/10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={resetQuiz}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Ambil Quiz Lagi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
