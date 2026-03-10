export const ranking = {
  calcTotal: (student) => {
    return (
      (student.math || 0) +
      (student.science || 0) +
      (student.english || 0) +
      (student.computer || 0)
    );
  },

  calcAverage: (student) => {
    return (ranking.calcTotal(student) / 4).toFixed(1);
  },

  getRankedList: (students) => {
    return [...students]
      .map((s) => ({
        ...s,
        totalMarks: ranking.calcTotal(s),
        average: ranking.calcAverage(s),
      }))
      .sort((a, b) => b.totalMarks - a.totalMarks)
      .map((s, i) => ({ ...s, rank: i + 1 }));
  },

  getMedalEmoji: (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  },

  getGrade: (total) => {
    const avg = total / 4;
    if (avg >= 90) return { grade: "A+", color: "#10b981" };
    if (avg >= 80) return { grade: "A",  color: "#3b82f6" };
    if (avg >= 70) return { grade: "B",  color: "#6366f1" };
    if (avg >= 60) return { grade: "C",  color: "#f59e0b" };
    if (avg >= 50) return { grade: "D",  color: "#f97316" };
    return           { grade: "F",  color: "#ef4444" };
  },
};