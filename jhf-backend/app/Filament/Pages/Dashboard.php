<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\NewsStats;
use App\Filament\Widgets\RecentNews;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Widgets\AccountWidget;

class Dashboard extends BaseDashboard
{
    protected static ?string $navigationLabel = 'Dashboard';

    public function getHeading(): string
    {
        return 'Dashboard Admin';
    }

    public function getSubheading(): ?string
    {
        return 'Ringkasan aktivitas dan berita terbaru.';
    }

    public function getWidgets(): array
    {
        return [
            AccountWidget::class,
            NewsStats::class,
            RecentNews::class,
        ];
    }
}
