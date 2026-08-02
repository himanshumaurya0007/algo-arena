import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createAdminProblem,
  getAdminProblemById,
  getProblemFormLookups,
  updateAdminProblem,
} from '../api/adminProblemsApi';

const inputClass =
  'w-full rounded-md border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400';

const labelClass = 'text-sm font-semibold text-slate-300';

const initialFormData = {
  title: '',
  slug: '',
  difficultyLevelId: '',
  programmingDomainId: '',
  description: '',
  constraints: '',
  timeLimitInMilliseconds: 1000,
  memoryLimitInMegabytes: 256,
  isPublished: true,
  tagIds: [],
  examples: [
    {
      displayOrder: 1,
      input: '',
      output: '',
      explanation: '',
    },
  ],
  testCases: [
    {
      displayOrder: 1,
      input: '',
      expectedOutput: '',
      isHidden: false,
    },
    {
      displayOrder: 2,
      input: '',
      expectedOutput: '',
      isHidden: true,
    },
  ],
  boilerplates: [],
};

function createSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function AdminAddProblemPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialFormData);
  const [lookups, setLookups] = useState({
    difficultyLevels: [],
    programmingDomains: [],
    programmingLanguages: [],
    tags: [],
  });
  const [isLoadingLookups, setIsLoadingLookups] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const canSubmit = useMemo(
    () =>
      formData.title.trim() &&
      formData.slug.trim() &&
      formData.difficultyLevelId &&
      formData.programmingDomainId &&
      formData.description.trim() &&
      formData.constraints.trim() &&
      formData.examples.every(
        (example) => example.input.trim() && example.output.trim()
      ) &&
      formData.testCases.every(
        (testCase) => testCase.input.trim() && testCase.expectedOutput.trim()
      ) &&
      formData.boilerplates.every((boilerplate) =>
        boilerplate.templateCode.trim()
      ),
    [formData]
  );

  async function loadLookups() {
    try {
      setIsLoadingLookups(true);

      const data = await getProblemFormLookups();

      setLookups(data);

      const supportedLanguages = data.programmingLanguages.filter((language) =>
        ['C', 'C++', 'Java'].includes(language.name)
      );

      const defaultBoilerplates = supportedLanguages.map((language) => ({
        programmingLanguageId: language.id,
        programmingLanguageName: language.name,
        templateCode: '',
      }));

      if (isEditMode) {
        const problem = await getAdminProblemById(id);

        setFormData({
          title: problem.title || '',
          slug: problem.slug || '',
          difficultyLevelId: problem.difficultyLevelId || '',
          programmingDomainId: problem.programmingDomainId || '',
          description: problem.description || '',
          constraints: problem.constraints || '',
          timeLimitInMilliseconds: problem.timeLimitInMilliseconds || 1000,
          memoryLimitInMegabytes: problem.memoryLimitInMegabytes || 256,
          isPublished: problem.isPublished,
          tagIds: problem.tagIds || [],
          examples:
            problem.examples?.length > 0
              ? problem.examples
              : initialFormData.examples,
          testCases:
            problem.testCases?.length > 0
              ? problem.testCases
              : initialFormData.testCases,
          boilerplates:
            problem.boilerplates?.length > 0
              ? problem.boilerplates
              : defaultBoilerplates,
        });
      } else {
        setFormData((current) => ({
          ...current,
          boilerplates: defaultBoilerplates,
        }));
      }
    } catch (error) {
      setMessage(error.message || 'Unable to load form options.');
    } finally {
      setIsLoadingLookups(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLookups();
    }, 0);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  function handleChange(event) {
    const { checked, name, type, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleTagToggle(tagId) {
    setFormData((current) => {
      const isSelected = current.tagIds.includes(tagId);

      return {
        ...current,
        tagIds: isSelected
          ? current.tagIds.filter((currentTagId) => currentTagId !== tagId)
          : [...current.tagIds, tagId],
      };
    });
  }

  function handleExampleChange(index, field, value) {
    setFormData((current) => ({
      ...current,
      examples: current.examples.map((example, exampleIndex) =>
        exampleIndex === index
          ? {
              ...example,
              [field]: value,
            }
          : example
      ),
    }));
  }

  function handleTestCaseChange(index, field, value) {
    setFormData((current) => ({
      ...current,
      testCases: current.testCases.map((testCase, testCaseIndex) =>
        testCaseIndex === index
          ? {
              ...testCase,
              [field]: value,
            }
          : testCase
      ),
    }));
  }

  function handleBoilerplateChange(index, value) {
    setFormData((current) => ({
      ...current,
      boilerplates: current.boilerplates.map((boilerplate, boilerplateIndex) =>
        boilerplateIndex === index
          ? {
              ...boilerplate,
              templateCode: value,
            }
          : boilerplate
      ),
    }));
  }

  function handleTitleChange(event) {
    const { value } = event.target;

    setFormData((current) => ({
      ...current,
      title: value,
      slug: current.slug ? current.slug : createSlug(value),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) {
      setMessage('Please fill all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      const payload = {
        programmingDomainId: formData.programmingDomainId,
        difficultyLevelId: formData.difficultyLevelId,
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        constraints: formData.constraints,
        timeLimitInMilliseconds: Number(formData.timeLimitInMilliseconds),
        memoryLimitInMegabytes: Number(formData.memoryLimitInMegabytes),
        isPublished: formData.isPublished,
        tagIds: formData.tagIds,
        examples: formData.examples.map((example, index) => ({
          displayOrder: index + 1,
          input: example.input,
          output: example.output,
          explanation: example.explanation,
        })),
        testCases: formData.testCases.map((testCase, index) => ({
          displayOrder: index + 1,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          isHidden: testCase.isHidden,
        })),
        boilerplates: formData.boilerplates.map((boilerplate) => ({
          programmingLanguageId: boilerplate.programmingLanguageId,
          templateCode: boilerplate.templateCode,
        })),
      };

      if (isEditMode) {
        await updateAdminProblem(id, payload);
      } else {
        await createAdminProblem(payload);
      }

      navigate('/admin/problems');


    } catch (error) {
      setMessage(error.message || 'Unable to create problem.');
    } finally {
      setIsSubmitting(false);
    }
  }

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
          {isEditMode ? 'Edit problem' : 'Add new problem'}
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          {isEditMode
            ? 'Update basic problem details. Examples, test cases, tags, and boilerplates will be connected in the next phase.'
            : 'Create a DSA problem with basic details. Examples, test cases, tags, and boilerplates will be connected in the next phase.'}
        </p>
      </div>

      {message && (
        <div className="rounded-md border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-200">
          {message}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Basic Details</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className={labelClass}>Problem Title</span>
              <input
                className={inputClass}
                name="title"
                onChange={handleTitleChange}
                placeholder="Target Strike"
                type="text"
                value={formData.title}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Slug</span>
              <input
                className={inputClass}
                name="slug"
                onChange={handleChange}
                placeholder="target-strike"
                type="text"
                value={formData.slug}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Difficulty</span>
              <select
                className={inputClass}
                disabled={isLoadingLookups}
                name="difficultyLevelId"
                onChange={handleChange}
                value={formData.difficultyLevelId}
              >
                <option value="">Select difficulty</option>
                {lookups.difficultyLevels.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Programming Domain</span>
              <select
                className={inputClass}
                disabled={isLoadingLookups}
                name="programmingDomainId"
                onChange={handleChange}
                value={formData.programmingDomainId}
              >
                <option value="">Select domain</option>
                {lookups.programmingDomains.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Time Limit (ms)</span>
              <input
                className={inputClass}
                min="100"
                name="timeLimitInMilliseconds"
                onChange={handleChange}
                type="number"
                value={formData.timeLimitInMilliseconds}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Memory Limit (MB)</span>
              <input
                className={inputClass}
                min="16"
                name="memoryLimitInMegabytes"
                onChange={handleChange}
                type="number"
                value={formData.memoryLimitInMegabytes}
              />
            </label>
          </div>

          <label className="mt-5 flex items-center gap-3">
            <input
              checked={formData.isPublished}
              className="size-4 accent-sky-400"
              name="isPublished"
              onChange={handleChange}
              type="checkbox"
            />

            <span className={labelClass}>Publish problem immediately</span>
          </label>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Problem Statement</h2>

          <div className="mt-5 space-y-5">
            <label className="space-y-2">
              <span className={labelClass}>Description</span>
              <textarea
                className={`${inputClass} min-h-36 resize-y`}
                name="description"
                onChange={handleChange}
                placeholder="Write the full problem statement here..."
                value={formData.description}
              />
            </label>

            <label className="space-y-2">
              <span className={labelClass}>Constraints</span>
              <textarea
                className={`${inputClass} min-h-24 resize-y`}
                name="constraints"
                onChange={handleChange}
                placeholder="1 <= n <= 10^5"
                value={formData.constraints}
              />
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Tags</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {lookups.tags.map((tag) => (
              <label
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  formData.tagIds.includes(tag.id)
                    ? 'border-sky-400 bg-sky-400 text-[#111827]'
                    : 'border-white/10 bg-[#111827] text-slate-300 hover:border-sky-400'
                }`}
                key={tag.id}
              >
                <input
                  checked={formData.tagIds.includes(tag.id)}
                  className="sr-only"
                  onChange={() => handleTagToggle(tag.id)}
                  type="checkbox"
                />
                {tag.name}
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Visible Example</h2>

          {formData.examples.map((example, index) => (
            <div className="mt-5 space-y-5" key={example.displayOrder}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className={labelClass}>Input</span>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y font-mono`}
                    onChange={(event) =>
                      handleExampleChange(index, 'input', event.target.value)
                    }
                    placeholder="nums = [2, 7, 11, 15], target = 9"
                    value={example.input}
                  />
                </label>

                <label className="space-y-2">
                  <span className={labelClass}>Expected Output</span>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y font-mono`}
                    onChange={(event) =>
                      handleExampleChange(index, 'output', event.target.value)
                    }
                    placeholder="[0, 1]"
                    value={example.output}
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className={labelClass}>Explanation</span>
                <textarea
                  className={`${inputClass} min-h-24 resize-y`}
                  onChange={(event) =>
                    handleExampleChange(
                      index,
                      'explanation',
                      event.target.value
                    )
                  }
                  placeholder="Explain why the expected output is correct."
                  value={example.explanation || ''}
                />
              </label>
            </div>
          ))}
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Judge Test Cases</h2>

          <div className="mt-5 space-y-5">
            {formData.testCases.map((testCase, index) => (
              <div
                className="rounded-lg border border-white/10 bg-[#111827] p-5"
                key={testCase.displayOrder}
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-white">
                    Test Case {index + 1}
                  </h3>

                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                    <input
                      checked={testCase.isHidden}
                      className="size-4 accent-violet-400"
                      onChange={(event) =>
                        handleTestCaseChange(
                          index,
                          'isHidden',
                          event.target.checked
                        )
                      }
                      type="checkbox"
                    />
                    Hidden
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className={labelClass}>Input</span>
                    <textarea
                      className={`${inputClass} min-h-28 resize-y font-mono`}
                      onChange={(event) =>
                        handleTestCaseChange(index, 'input', event.target.value)
                      }
                      placeholder="nums = [3, 2, 4], target = 6"
                      value={testCase.input}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className={labelClass}>Expected Output</span>
                    <textarea
                      className={`${inputClass} min-h-28 resize-y font-mono`}
                      onChange={(event) =>
                        handleTestCaseChange(
                          index,
                          'expectedOutput',
                          event.target.value
                        )
                      }
                      placeholder="[1, 2]"
                      value={testCase.expectedOutput}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-[#172033] p-6">
          <h2 className="text-xl font-bold text-white">Starter Code</h2>

          <div className="mt-5 space-y-5">
            {formData.boilerplates.map((boilerplate, index) => (
              <label
                className="block space-y-2"
                key={boilerplate.programmingLanguageId}
              >
                <span className={labelClass}>
                  {boilerplate.programmingLanguageName || 'Language'} Starter
                  Code
                </span>

                <textarea
                  className={`${inputClass} min-h-36 resize-y font-mono`}
                  onChange={(event) =>
                    handleBoilerplateChange(index, event.target.value)
                  }
                  placeholder="Write starter code here..."
                  value={boilerplate.templateCode}
                />
              </label>
            ))}
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
            className="rounded-md bg-emerald-400 px-5 py-3 text-sm font-bold text-[#111827] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting || !canSubmit}
            type="submit"
          >
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Problem'
                : 'Create Problem'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default AdminAddProblemPage;
