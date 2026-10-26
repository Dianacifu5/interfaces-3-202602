import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type TrendType = 'positive' | 'negative' | 'neutral';

export interface MetricBentoStatProps {
    title: string;
    value: string | number;
    maxValue?: string | number;
    trendText?: string;
    trendType?: TrendType;
    icon: ReactNode;
}

const trendClasses: Record<TrendType, string> = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-base-content/60',
};

/** Tarjeta de métrica estilo bento. Usa los bloques `stat` de daisyUI; Server Component. */
export default function MetricBentoStat({
    title,
    value,
    maxValue,
    trendText,
    trendType = 'neutral',
    icon,
}: MetricBentoStatProps) {
    return (
        <div className="stats w-full border border-base-300 bg-base-100 shadow-sm">
            <div className="stat">
                <div className="stat-figure rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>
                <div className="stat-title">{title}</div>
                <div className="stat-value text-primary">
                    {value}
                    {maxValue !== undefined && (
                        <span className="text-base font-medium text-base-content/50"> / {maxValue}</span>
                    )}
                </div>
                {trendText && <div className={cn('stat-desc font-medium', trendClasses[trendType])}>{trendText}</div>}
            </div>
        </div>
    );
}
