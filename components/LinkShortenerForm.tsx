'use client';

import { useActionState } from 'react';
import { buryLink } from '@/app/actions';

const initialState = {
    message: '',
    errors: undefined,
};

export default function LinkShortenerForm() {
    const [state, formAction, isPending] = useActionState(buryLink, initialState);

    return (
        <div className="bg-kubur-card p-8 rounded-lg shadow-lg border border-gray-800">
            <form action={formAction} className="space-y-6">
                <input type="text" name="hp" className="hidden" aria-hidden="true" autoComplete="off" />
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Target URL</label>
                    <input
                        type="url"
                        name="url"
                        placeholder="https://example.com/very-long-url..."
                        required
                        className="w-full bg-kubur-gray border border-gray-700 rounded-md px-4 py-3 text-kubur-text focus:ring-1 focus:ring-kubur-accent focus:outline-none placeholder-gray-600"
                    />
                    {state?.errors?.url && <p className="text-kubur-danger text-xs mt-1">{state.errors.url[0]}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Custom Alias (Optional)</label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500">/</span>
                        <input
                            type="text"
                            name="custom_alias"
                            placeholder="your-alias"
                            className="w-full bg-kubur-gray border border-gray-700 rounded-md pl-8 pr-4 py-3 text-kubur-text focus:ring-1 focus:ring-kubur-accent focus:outline-none placeholder-gray-600"
                        />
                    </div>
                    {state?.errors?.custom_alias && <p className="text-kubur-danger text-xs mt-1">{state.errors.custom_alias[0]}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Time Until Decomposition</label>
                    <div className="grid grid-cols-5 gap-2">
                        {['8h', '24h', '3d', '7d', '30d'].map((t, idx) => (
                            <label key={t} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="duration"
                                    value={t}
                                    defaultChecked={idx === 1}
                                    className="peer sr-only"
                                />
                                <div className="text-center py-2 text-sm rounded bg-kubur-gray border border-gray-700 text-gray-400 peer-checked:bg-kubur-accent peer-checked:text-white peer-checked:border-kubur-accent transition hover:border-gray-500">
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </div>
                            </label>
                        ))}
                    </div>
                    {state?.errors?.duration && <p className="text-kubur-danger text-xs mt-1">{state.errors.duration[0]}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-kubur-text text-kubur-black font-bold py-3 rounded-md hover:bg-white transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? 'Burying...' : 'Bury It'}
                </button>
                {state?.message && !state?.errors && (
                    <div className="bg-green-900/20 border border-green-800 p-4 rounded-md text-center">
                        <p className="text-kubur-text mb-2 text-sm text-gray-400">Rest in Peace:</p>
                        <div className="flex items-center gap-2">
                            <input
                                readOnly
                                value={state.message}
                                className="w-full bg-kubur-black border border-gray-700 rounded px-3 py-2 text-kubur-accent text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(state.message);
                                    const btn = document.getElementById('copy-btn');
                                    if (btn) {
                                        const originalText = btn.innerText;
                                        btn.innerText = 'Copied!';
                                        setTimeout(() => btn.innerText = originalText, 2000);
                                    }
                                }}
                                id="copy-btn"
                                className="bg-kubur-gray border border-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded text-sm transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
