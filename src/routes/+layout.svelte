<script>
    import { user, userData } from '$lib/firebase';
    import '../base.css'

    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    injectSpeedInsights();

    $user;
    $userData;
</script>

<slot></slot>