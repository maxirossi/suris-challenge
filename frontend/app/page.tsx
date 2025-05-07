'use client';

import { useState, useEffect } from 'react';

type Entry = {
  uuid: string;
  word: string;
  isPalindrome: boolean;
};

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ message: string; success: boolean } | null>(null);
  const [history, setHistory] = useState<Entry[]>([]);

  const checkPalindrome = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/palidrome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: text })
      });

      const data = await res.json();
      let wordUsed = text;

      if (data?.isPalindrome !== undefined) {
        setResult({
          message: `"${wordUsed}" ${data.isPalindrome ? 'es' : 'no es'} un palíndromo`,
          success: data.isPalindrome
        });

        const newEntry: Entry = {
          uuid: data.uuid ?? crypto.randomUUID(),
          word: wordUsed,
          isPalindrome: data.isPalindrome
        };

        const updatedHistory = [newEntry, ...history.slice(0, 9)];
        setHistory(updatedHistory);
        sessionStorage.setItem('palindromeHistory', JSON.stringify(updatedHistory));
      } else if (data?.palindrome) {
        setResult({
          message: `"${data.palindrome.word}" ${data.palindrome.isPalindrome ? 'es' : 'no es'} un palíndromo`,
          success: data.palindrome.isPalindrome
        });

        const newEntry: Entry = {
          uuid: data.palindrome.uuid,
          word: data.palindrome.word,
          isPalindrome: data.palindrome.isPalindrome
        };

        const updatedHistory = [newEntry, ...history.filter(h => h.uuid !== newEntry.uuid)].slice(0, 10);
        setHistory(updatedHistory);
        sessionStorage.setItem('palindromeHistory', JSON.stringify(updatedHistory));
      }

      setText('');
    } catch (error) {
      setResult({ message: 'Error de conexión con el servidor', success: false });
    }
  };

  const fetchHistory = async () => {
    const fromSession = sessionStorage.getItem('palindromeHistory');
    if (fromSession) {
      setHistory(JSON.parse(fromSession));
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/palidrome/latest?limit=10`);
      const data = await res.json();

      if (data.success && data.palindromes) {
        const entries: Entry[] = data.palindromes.map((item: any) => ({
          uuid: item.uuid,
          word: item.word,
          isPalindrome: item.isPalindrome
        }));

        setHistory(entries);
        sessionStorage.setItem('palindromeHistory', JSON.stringify(entries));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <style>{`
        body {
          background-color: #f3f4f6;
          margin: 0;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
          margin: 4rem auto;
        }
        h1 {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        input[type="text"] {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          width: 100%;
          background-color: #2563eb;
          color: white;
          padding: 0.6rem;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }
        button:hover {
          background-color: #1d4ed8;
        }
        .result {
          margin-top: 1rem;
          text-align: center;
          font-weight: 500;
        }
        .result.success {
          color: green;
        }
        .result.fail {
          color: red;
        }
        hr {
          margin: 2rem 0;
          border: 1px solid #e5e7eb;
        }
        h2 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        ul {
          padding-left: 1.2rem;
          font-size: 0.95rem;
        }
      `}</style>

      <main className="container">
        <h1>🔍 Verificador de Palíndromos</h1>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribí una palabra o frase..."
        />

        <button onClick={checkPalindrome}>Verificar</button>

        {result && (
          <p className={`result ${result.success ? 'success' : 'fail'}`}>
            {result.message} {result.success ? '✅' : '❌'}
          </p>
        )}

        <hr />

        <h2>Historial Reciente</h2>
        <ul>
          {history.map((entry) => (
            <li key={entry.uuid}>
              "{entry.word}" → {entry.isPalindrome ? '✔️ Sí' : '✖️ No'}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
