import { describe, it, expect, beforeEach } from 'vitest';
import {
  captureAttribution,
  getAttribution,
  isPaidClick,
  resetAttribution,
} from '@/lib/attribution';

describe('captureAttribution', () => {
  beforeEach(() => {
    resetAttribution();
  });

  it('picks up the Google click id and campaign tags', () => {
    const result = captureAttribution(
      '?gclid=abc123&utm_source=google&utm_medium=cpc&utm_campaign=maintenance',
      '',
      '/services/garden-maintenance',
    );

    expect(result).toMatchObject({
      gclid: 'abc123',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'maintenance',
      landing_page: '/services/garden-maintenance',
    });
  });

  it('ignores parameters that are not campaign tags', () => {
    const result = captureAttribution('?ref=spam&evil=payload&gclid=ok', '', '/');
    expect(result.gclid).toBe('ok');
    expect(Object.keys(result)).not.toContain('ref');
    expect(Object.keys(result)).not.toContain('evil');
  });

  it('records an external referrer but not an internal one', () => {
    const external = captureAttribution('', 'https://www.bing.com/search', '/');
    expect(external.referrer).toBe('https://www.bing.com/search');

    resetAttribution();
    const internal = captureAttribution('', `${window.location.origin}/about`, '/');
    expect(internal.referrer).toBeUndefined();
  });

  it('caps absurdly long values', () => {
    const result = captureAttribution(`?utm_campaign=${'x'.repeat(1000)}`, '', '/');
    expect(result.utm_campaign).toHaveLength(300);
  });

  it('keeps the first click, so a remount cannot blank it', () => {
    captureAttribution('?gclid=first', '', '/');
    const second = captureAttribution('?gclid=second', '', '/contact');

    expect(second.gclid).toBe('first');
    expect(getAttribution().gclid).toBe('first');
  });

  it('returns an empty object before anything is captured', () => {
    expect(getAttribution()).toEqual({});
  });
});

describe('isPaidClick', () => {
  beforeEach(() => {
    resetAttribution();
  });

  it('is true for any of the Google click identifiers', () => {
    captureAttribution('?wbraid=xyz', '', '/');
    expect(isPaidClick()).toBe(true);
  });

  it('is false for organic traffic carrying only utm tags', () => {
    captureAttribution('?utm_source=newsletter', '', '/');
    expect(isPaidClick()).toBe(false);
  });
});
