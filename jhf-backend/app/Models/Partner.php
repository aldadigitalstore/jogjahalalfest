<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Partner extends Model
{
    protected $fillable = [
        'name',
        'category',
        'logo',
        'logo_shape',
        'logo_width',
        'logo_height',
    ];

    protected $casts = [
        'logo_width' => 'integer',
        'logo_height' => 'integer',
    ];

    protected $appends = [
        'logo_url',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $partner) {
            if (!$partner->logo) {
                $partner->logo_width = null;
                $partner->logo_height = null;
                return;
            }

            if (!$partner->isDirty('logo') && $partner->logo_width && $partner->logo_height) {
                return;
            }

            $disk = Storage::disk('public');

            if (!$disk->exists($partner->logo)) {
                return;
            }

            $path = $disk->path($partner->logo);
            $size = @getimagesize($path);

            if ($size === false) {
                return;
            }

            $partner->logo_width = $size[0] ?? null;
            $partner->logo_height = $size[1] ?? null;
        });
    }

    public function getLogoUrlAttribute(): ?string
    {
        if (!$this->logo) {
            return null;
        }

        return Storage::disk('public')->url($this->logo);
    }
}
