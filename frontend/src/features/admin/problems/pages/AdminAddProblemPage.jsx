import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const inputClass =
  'w-full rounded-md border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400';

const labelClass = 'text-sm font-semibold text-slate-300';

function AdminAddProblemPage() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl space-y-6"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Link
          className="text-sm font-semibold text-sky-300 hover:underline"
          to="/admin/problems"
        >
          Back to problems
        </Link>

        <h1 className="mt-3 text-3xl font-extrabold text-white">
          Add new problem
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Create a DSA problem with description, examples, constraints, and
          learning resources.
        </p>
      </div>

      <form className="space-y-6">
        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Basic Details</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className={labelClass}>Problem Title</span>
              <input
                className={inputClass}
                placeholder="Target Strike"
                type="text"
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Slug</span>
              <input
                className={inputClass}
                placeholder="target-strike"
                type="text"
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Difficulty</span>
              <select className={inputClass} defaultValue="">
                <option disabled value="">
                  Select difficulty
                </option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Topics</span>
              <input
                className={inputClass}
                placeholder="Array, Hash Map"
                type="text"
              />
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Problem Statement</h2>

          <div className="mt-5 space-y-5">
            <label className="space-y-2">
              <span className={labelClass}>Description</span>
              <textarea
                className={`${inputClass} min-h-36 resize-y`}
                placeholder="Write the full problem statement here..."
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Constraints</span>
              <textarea
                className={`${inputClass} min-h-24 resize-y`}
                placeholder="1 <= n <= 10^5"
              />
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Starter Code</h2>

          <p className="mt-1 text-sm text-slate-400">
            Provide default starter code for each supported language.
          </p>

          <div className="mt-5 space-y-5">
            <label className="space-y-2">
              <span className={labelClass}>JavaScript</span>
              <textarea
                className={`${inputClass} min-h-36 resize-y font-mono`}
                defaultValue={`function solve(input) {
               // Write your solution here
              }`}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Java</span>
              <textarea
                className={`${inputClass} min-h-36 resize-y font-mono`}
                defaultValue={`class Solution {
                  public static void main(String[] args) {
                  // Write your solution here
                  }
                  }`}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>C++</span>
              <textarea
                className={`${inputClass} min-h-36 resize-y font-mono`}
                defaultValue={`#include <bits/stdc++.h>
                  using namespace std;
                  int main() {
                  // Write your solution here
                  return 0;
                  }`}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Python</span>
              <textarea
                className={`${inputClass} min-h-36 resize-y font-mono`}
                defaultValue={`def solve():
                  # Write your solution here
                  pass
                  solve()`}
              />
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Visible Example</h2>

          <p className="mt-1 text-sm text-slate-400">
            This example will be shown on the problem page for learners.
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className={labelClass}>Input</span>
              <textarea
                className={`${inputClass} min-h-28 resize-y font-mono`}
                placeholder="nums = [2, 7, 11, 15], target = 9"
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Expected Output</span>
              <textarea
                className={`${inputClass} min-h-28 resize-y font-mono`}
                placeholder="[0, 1]"
              />
            </label>
          </div>

          <label className="mt-5 block space-y-2">
            <span className={labelClass}>Explanation</span>
            <textarea
              className={`${inputClass} min-h-24 resize-y`}
              placeholder="Explain why the expected output is correct."
            />
          </label>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Judge Test Cases</h2>

          <p className="mt-1 text-sm text-slate-400">
            These cases will be used by the judge engine to validate submitted
            solutions.
          </p>

          <div className="mt-5 space-y-5">
            <div className="rounded-lg border border-white/10 bg-[#111827] p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-semibold text-white">Sample Test Case</h3>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Visible
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className={labelClass}>Input</span>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y font-mono`}
                    placeholder="nums = [2, 7, 11, 15], target = 9"
                  />
                </label>

                <label className="space-y-2">
                  <span className={labelClass}>Expected Output</span>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y font-mono`}
                    placeholder="[0, 1]"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#111827] p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-semibold text-white">Hidden Test Case</h3>

                <span className="rounded-full bg-violet-400/10 px-3 py-1 text-xs font-bold text-violet-300">
                  Hidden
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className={labelClass}>Input</span>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y font-mono`}
                    placeholder="nums = [3, 2, 4], target = 6"
                  />
                </label>

                <label className="space-y-2">
                  <span className={labelClass}>Expected Output</span>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y font-mono`}
                    placeholder="[1, 2]"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Learning Resources</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className={labelClass}>Article Link</span>
              <input
                className={inputClass}
                placeholder="/admin/articles/sliding-window-basics"
                type="text"
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Video Link</span>
              <input
                className={inputClass}
                placeholder="/admin/videos/binary-search-explained"
                type="text"
              />
            </label>
          </div>
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <Link
            className="rounded-md bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
            to="/admin/problems"
          >
            Cancel
          </Link>

          <button
            className="rounded-md bg-sky-400 px-5 py-3 text-sm font-bold text-[#111827] transition hover:bg-sky-300"
            type="button"
          >
            Save Draft
          </button>

          <button
            className="rounded-md bg-emerald-400 px-5 py-3 text-sm font-bold text-[#111827] transition hover:bg-emerald-300"
            type="submit"
          >
            Publish Problem
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default AdminAddProblemPage;
