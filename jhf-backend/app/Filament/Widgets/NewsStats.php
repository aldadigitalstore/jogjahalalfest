<?php

namespace App\Filament\Widgets;

use App\Models\News;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class NewsStats extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $totalNews = News::count();
        $recentNews = News::where('created_at', '>=', now()->subDays(30))->count();
        $latestDate = News::orderByDesc('date')->value('date')
            ?? News::orderByDesc('created_at')->value('created_at');

        $latestLabel = '-';
        if ($latestDate) {
            $latestLabel = Carbon::parse($latestDate)->format('d M Y');
        }

        return [
            Stat::make('Total Berita', $totalNews)
                ->description('Semua berita di sistem')
                ->icon('heroicon-o-newspaper')
                ->color('primary'),
            Stat::make('Berita 30 Hari', $recentNews)
                ->description('Dibuat 30 hari terakhir')
                ->icon('heroicon-o-arrow-trending-up')
                ->color('success'),
            Stat::make('Terakhir Update', $latestLabel)
                ->description('Tanggal update terakhir')
                ->icon('heroicon-o-clock')
                ->color('warning'),
        ];
    }
}
